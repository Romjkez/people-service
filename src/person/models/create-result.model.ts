import { ApiModelProperty } from '@nestjs/swagger';
import { Person } from '../entity/person.entity';

export class CreateResult {
  @ApiModelProperty({
    required: true, nullable: false, type: Person, example: {
      firstName: 'Roman',
      lastName: 'Ivanov',
      middleName: 'Ivanovich',
      email: 'ivanov@mail.com',
      id: 228,
      phone: 88005553535,
      gender: 'male',
      birthday: '2009-06-06',
      createdAt: new Date(),
      updatedAt: null,
      updatedBy: null,
    },
  })
  data: Person;

  @ApiModelProperty({
    required: true,
    nullable: false,
    type: 'boolean',
    example: false,
    description: 'true - user was found in database, false - user was created',
  })
  wasFound: boolean;
}
