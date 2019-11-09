import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Gender, MAX_EMAIL_LENGTH, MAX_FIRST_NAME_LENGTH, MAX_LAST_NAME_LENGTH, MAX_MIDDLE_NAME_LENGTH } from '../entity/person.entity';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_FIRST_NAME_LENGTH)
  @ApiModelProperty({
    description: 'Name of a new person',
    maxLength: MAX_FIRST_NAME_LENGTH,
    nullable: false,
    example: 'Vladimir',
    required: true,
  })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_MIDDLE_NAME_LENGTH)
  @ApiModelProperty({
    description: 'Patronymic/middle name of a new person',
    maxLength: MAX_MIDDLE_NAME_LENGTH,
    nullable: false,
    example: 'Vladimirovich',
    required: true,
  })
  readonly middleName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_LAST_NAME_LENGTH)
  @ApiModelProperty({
    description: 'Surname(last name) of a new person',
    maxLength: MAX_LAST_NAME_LENGTH,
    nullable: false,
    example: 'Putin',
    required: true,
  })
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_EMAIL_LENGTH)
  @ApiModelProperty({
    description: 'Email of a new person',
    maxLength: MAX_EMAIL_LENGTH,
    nullable: false,
    example: 'example@mail.com',
    required: true,
  })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiModelProperty({
    description: 'Birthday of a new person',
    nullable: true,
    maxLength: 10,
    pattern: 'yyyy-mm-dd',
    example: '1999-06-28',
    required: false,
    type: 'string',
  })
  readonly birthday?: string;

  @IsEnum(['male', 'female'])
  @IsOptional()
  @ApiModelProperty({
    description: 'Gender (sex) of a new person',
    nullable: true,
    enum: Gender,
    required: false,
    example: 'male',
  })
  readonly gender?: Gender;

  @IsNumber()
  @IsOptional()
  @ApiModelProperty({
    description: 'Phone number of a new person (only digits without spaces and special characters)',
    nullable: true,
    example: 88005553535,
    type: 'number',
    required: false,
  })
  readonly phone?: number;
}
