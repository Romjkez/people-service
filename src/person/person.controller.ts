import { Controller, Get } from '@nestjs/common';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {
  }

  @Get('person')
  async getPerson(): Promise<Person[]> {
    return this.personService.getAll();
  }
}
