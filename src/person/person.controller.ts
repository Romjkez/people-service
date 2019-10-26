import { Body, Controller, Get, Post } from '@nestjs/common';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {
  }

  @Get()
  async getPerson(): Promise<Person[]> {
    return this.personService.getAll();
  }

  @Post('create')
  async createPerson(@Body() options: CreatePersonDto): Promise<Person> {
    return this.personService.createPerson(options);
  }
}
