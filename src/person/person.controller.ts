import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { DatabaseException } from '../exceptions/database.exception';
import { RemovalResultDto } from './dto/removal-result.dto';
import { Observable } from 'rxjs';
import { catchError, filter, first, map } from 'rxjs/operators';
import { DeleteResult } from 'typeorm';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {
  }

  @Get()
  getAll(): Observable<Person[]> {
    return this.personService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Observable<Person> {
    return this.personService.getById(id).pipe(
      first(),
      filter(Boolean),
      map((person: Person) => {
        if (!person) {
          throw new NotFoundException();
        }
        return person;
      }),
      catchError(err => {
        throw new DatabaseException(err.message);
      }),
    );
  }

  @Post('create')
  create(@Body() options: CreatePersonDto): Observable<Person> {
    return this.personService.create(options)
      .pipe(
        first(),
        catchError(err => {
          throw new DatabaseException(err.message);
        }),
      );
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<RemovalResultDto> {
    return this.personService.deleteById(id)
      .pipe(
        first(),
        filter(Boolean),
        map((res: DeleteResult) => res.raw.affectedRows),
        map(affectedRows => {
          if (!affectedRows && affectedRows < 1) {
            throw new NotFoundException();
          }
          return affectedRows;
        }),
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
