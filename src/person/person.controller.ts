import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { DatabaseException } from '../exceptions/database.exception';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {
  }

  @Get()
  async getAll(): Promise<Person[]> {
    return this.personService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Person> {
    return this.personService.getById(id)
      .then(p => {
        if (!p) {
          throw new NotFoundException();
        }
        return p;
      })
      .catch(e => {
        throw new DatabaseException(e.message);
      });
  }

  @Post('create')
  async create(@Body() options: CreatePersonDto): Promise<Person> {
    return this.personService.create(options)
      .catch(e => {
        throw new DatabaseException(e.message);
      });
  }
}
