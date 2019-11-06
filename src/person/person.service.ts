import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { from, Observable, of } from 'rxjs';
import { UpdatePersonDto } from './dto/update-person.dto';
import { catchError, first, map } from 'rxjs/operators';
import { NotFoundFieldsException, SearchParams, SearchParamsWithError } from '../exceptions/search.params';
import { prepareSearchParams, removeEmptyFields } from '../utils/utils';

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

  update(id: number, options: UpdatePersonDto): Observable<UpdateResult> {
    return from(this.personRepository
      .update(id, Object.assign(options, { updatedAt: new Date() })));
  }

  searchByAnyField(query: string): Observable<Person[]> {
    return from(this.personRepository.query(
      `SELECT * FROM person WHERE firstName LIKE "%${query}%" OR lastName LIKE "%${query}%" OR middleName LIKE "%${query}%" OR email LIKE "%${query}%"`))
      .pipe(
        first(),
        map(res => {
          if (res && res.length === 0) {
            throw new NotFoundException(`No persons found by query: ${query}`);
          }
          return res;
        }),
      );
  }

  search(params: SearchParams): Observable<Person[]> {
    const rawParams: Partial<SearchParams> = prepareSearchParams(removeEmptyFields(params));
    return from(this.personRepository
      .find(rawParams))
      .pipe(
        first(),
        map((res: Person[]) => {
          if (res && res.length === 0) {
            const paramsWithError: SearchParamsWithError = { message: 'No persons found for given data', data: params };
            throw new NotFoundFieldsException(paramsWithError);
          }
          return res;
        }),
      );
  }
}
