import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { from, Observable } from 'rxjs';

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
    return from(this.personRepository.findOne(id));
  }

  deleteById(id: number): Observable<DeleteResult> {
    return from(this.personRepository.delete(id));
  }
}
