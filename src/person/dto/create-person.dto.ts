import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({ description: 'Name of a new user' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({ description: 'Surname(last name) of a new user' })
  lastName: string;
}
