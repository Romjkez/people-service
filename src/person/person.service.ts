import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { from, Observable, of } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private readonly personRepository: Repository<Person>) {
  }

  getAll(): Observable<Person[]> {
    return from(this.personRepository.find());
  }

  create(options: CreatePersonDto): Observable<Person> {
    return from(this.personRepository.save(options));
  }

  getById(id: number): Observable<Person> {
    return from(this.personRepository.findOneOrFail(id))
      .pipe(
        catchError(e => {
          if (e.name === 'EntityNotFound') {
            throw new NotFoundException(e.message);
          }
          return of(e);
        }),
      );
  }

  deleteById(id: number): Observable<DeleteResult> {
    return from(this.personRepository.delete(id));
  }

  update(id: number, options: UpdateUserDto): Observable<UpdateResult> {
    return from(this.personRepository
      .update(id, Object.assign(options, { updatedAt: new Date() })));
  }
}
