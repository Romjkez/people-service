import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private readonly personRepository: Repository<Person>) {
  }

  async getAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async createPerson(options: CreatePersonDto): Promise<Person> {
    return this.personRepository.create(options);
  }

  async deletePerson(id: number): Promise<DeleteResult> {
    return this.personRepository.delete(id);
  }
}
