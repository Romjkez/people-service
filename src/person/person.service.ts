import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { from, Observable, of, zip } from 'rxjs';
import { UpdatePersonDto } from './dto/update-person.dto';
import { first, flatMap, map } from 'rxjs/operators';
import { SearchParams } from '../exceptions/search.params';
import { prepareSearchParams, removeEmptyFields } from '../utils/utils';
import { CreateResult } from './models/create-result.model';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private readonly personRepository: Repository<Person>) {
  }

  getAll(): Observable<Person[]> {
    return from(this.personRepository.find());
  }

  create(options: CreatePersonDto): Observable<CreateResult> {
    const searchParams: SearchParams = {
      firstName: options.firstName,
      lastName: options.lastName,
      middleName: options.middleName,
      email: options.email,
    };
    return from(this.search(searchParams))
      .pipe(
        flatMap((res: Person) => {
          if (res) {
            return zip(of(res), of(true));
          }
          return zip(from(this.personRepository.save(options)), of(false));
        }),
        map(([person, wasFound]) => {
          return { data: person, wasFound };
        }),
      );
  }

  getById(id: number): Observable<Person> {
    return from(this.personRepository.findOneOrFail(id));
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

  search(params: SearchParams): Observable<Person> {
    const rawParams: Partial<SearchParams> = prepareSearchParams(removeEmptyFields(params));
    return from(this.personRepository.findOne(rawParams));
  }
}
