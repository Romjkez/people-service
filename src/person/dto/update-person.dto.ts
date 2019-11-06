import { Gender } from '../entity/person.entity';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePersonDto {
  @IsEnum(['male', 'female'])
  @IsOptional()
  @ApiModelProperty({
    description: 'Gender (sex) of a person',
    nullable: true,
    enum: Gender,
    required: false,
  })
  readonly gender?: Gender;

  @IsDate()
  @IsOptional()
  @ApiModelProperty({
    description: 'Birthday of a person',
    nullable: true,
    example: '1999-05-20',
    required: false,
    type: 'string',
    pattern: 'yyyy\\mm\\dd',
  })
  readonly birthday?: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiModelProperty({
    description: 'Last service changed the person',
    nullable: false,
    example: 'students-service',
    required: true,
    maxLength: 100,
  })
  readonly updatedBy: string;
}
