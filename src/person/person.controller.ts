import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { DatabaseException } from '../exceptions/database.exception';
import { RemovalResultDto } from './dto/removal-result.dto';
import { Observable } from 'rxjs';
import { catchError, filter, first, flatMap, map } from 'rxjs/operators';
import { UpdateUserDto } from './dto/update-user.dto';

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
      map((person: Person) => person),
      catchError(err => {
        throw new DatabaseException(err.message);
      }),
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
  update(@Param('id') id: number, @Body() options: UpdateUserDto): Observable<Person> {
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
