import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { DatabaseException } from '../exceptions/database.exception';
import { RemovalResultDto } from './dto/removal-result.dto';
import { Observable } from 'rxjs';
import { catchError, first, flatMap, map } from 'rxjs/operators';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiImplicitQuery } from '@nestjs/swagger';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {
  }

  @Get()
  @ApiImplicitQuery({
    name: 'query',
    required: false,
  })
  get(@Query('query') query?: string): Observable<Person[]> {
    if (query && query.trim().length > 2) {
      return this.personService.search(query)
        .pipe(
          first(),
          map(res => {
            if (res && res.length === 0) {
              throw new NotFoundException(`No users found by query: ${query}`);
            }
            return res;
          }),
        );
    } else if (query && query.trim().length <= 2) {
      throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
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
  create(@Body() options: CreatePersonDto): Observable<Person> {
    return this.personService.create(options)
      .pipe(
        first(),
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
