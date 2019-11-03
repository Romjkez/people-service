import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
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

  @IsDate()
  @IsOptional()
  @ApiModelProperty({
    description: 'Birthday of a new person',
    nullable: true,
    example: '1999-06-28',
    required: false,
  })
  readonly birthday?: Date;

  @IsEnum(['male', 'female'])
  @IsOptional()
  @ApiModelProperty({
    description: 'Gender (sex) of a new person',
    nullable: true,
    enum: Gender,
    required: false,
  })
  readonly gender?: Gender;
}
