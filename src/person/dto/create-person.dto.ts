import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Gender } from '../entity/person.entity';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({
    description: 'Name of a new user',
    maxLength: 255,
  })
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: 'Patronymic/middle name of a new user',
    maxLength: 255,
    nullable: true,
  })
  readonly middleName: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({
    description: 'Surname(last name) of a new user',
    maxLength: 255,
    nullable: false,
  })
  readonly lastName: string;

  @IsDate()
  @IsOptional()
  @ApiModelProperty({
    description: 'Birthday of a new user',
    nullable: true,
  })
  readonly birthday: Date;

  @IsEnum(['male', 'female'])
  @IsOptional()
  @ApiModelProperty({
    description: 'Gender (sex) of a new user',
    nullable: true,
  })
  readonly gender: Gender;
}
