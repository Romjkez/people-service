import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { DatabaseException } from '../exceptions/database.exception';
import { RemovalResultDto } from './dto/removal-result.dto';
import { Observable } from 'rxjs';
import { catchError, first, flatMap, map } from 'rxjs/operators';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiImplicitQuery } from '@nestjs/swagger';
import { NotFoundFieldsException, SearchParams, SearchParamsWithError } from '../exceptions/search.params';
import { CreatePersonPipe } from '../pipes/create-person.pipe';
import { CreatePersonDtoValidationPipe } from '../pipes/create-person-dto-validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {
  }

  @Get()
  @ApiImplicitQuery({ name: 'query', required: false, description: 'Part of or full firstName/middleName/lastName/email separately' })
  @ApiImplicitQuery({ name: 'firstName', required: false })
  @ApiImplicitQuery({ name: 'middleName', required: false })
  @ApiImplicitQuery({ name: 'lastName', required: false })
  @ApiImplicitQuery({ name: 'email', required: false })
  get(@Query('query') query?: string,
      @Query('firstName') firstName?: string,
      @Query('middleName') middleName?: string,
      @Query('lastName') lastName?: string,
      @Query('email') email?: string,
  ): Observable<Person[]> {
    if (query) {
      query = query.trim().replace(/[\/\\#,+()$~%'":*?<>{}]/g, '');
      if (query.length > 2) {
        return this.personService.searchByAnyField(query);
      } else {
        throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
      }
    } else if (firstName || middleName || lastName || email) {
      const searchParams: SearchParams = {
        firstName: firstName || null,
        lastName: lastName || null,
        middleName: middleName || null,
        email: email || null,
      };
      return this.personService.search(searchParams)
        .pipe(
          first(),
          map((res: Person[]) => {
            if (res && res.length === 0) {
              const paramsWithError: SearchParamsWithError = { message: 'No persons found for given data', data: searchParams };
              throw new NotFoundFieldsException(paramsWithError);
            }
            return res;
          }),
        );
    }
    return this.personService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Observable<Person> {
    return this.personService.getById(id).pipe(
      first(),
    );
  }

  @Post()
  @UsePipes(CreatePersonPipe, CreatePersonDtoValidationPipe)
  create(@Body() options: CreatePersonDto): Observable<Person> {
    return this.personService.search(options)
      .pipe(
        map(res => {
          if (res && res.length !== 0) {
            throw new ConflictException('User with such firstName, middleName, lastName and email already exists');
          }
          return res;
        }),
        flatMap(() => this.personService.create(options)),
        catchError(err => {
          throw new DatabaseException(err.message);
        }),
      );
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() options: UpdatePersonDto): Observable<Person> {
    return this.personService.update(id, options)
      .pipe(
        first(),
        flatMap(res => this.personService.getById(id).pipe(first())),
        catchError(err => {
          throw new DatabaseException(err.message);
        }),
      );
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<RemovalResultDto> {
    return this.personService.getById(id).pipe(
      first(),
      flatMap(() => this.personService.deleteById(id)),
      first(),
      map(res => res.raw.affectedRows),
      map(affectedRows => {
        return {
          affectedRows,
          ok: affectedRows && affectedRows > 0,
        };
      }),
      catchError(err => {
        throw new DatabaseException(err.message);
      }),
    );
  }
}
