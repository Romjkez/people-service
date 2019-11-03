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

  async create(options: CreatePersonDto): Promise<Person> {
    return this.personRepository.save(options);
  }

  async getById(id: number): Promise<Person> {
    return this.personRepository.findOne(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.personRepository.delete(id);
  }
}
