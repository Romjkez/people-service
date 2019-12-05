import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

export enum Gender {
  male = 'male',
  female = 'female',
}

export const MAX_FIRST_NAME_LENGTH: number = 255;
export const MAX_MIDDLE_NAME_LENGTH: number = 255;
export const MAX_LAST_NAME_LENGTH: number = 255;
export const MAX_EMAIL_LENGTH: number = 150;
export const MAX_PHONE_LENGTH: number = 20;

@Entity()
@Unique(['firstName', 'middleName', 'lastName', 'email'])
export class Person {
  @PrimaryGeneratedColumn({ unsigned: true })
  @ApiModelProperty({ type: 'integer', minimum: 1, nullable: false, required: true, example: 1337 })
  id: number;

  @Column({ type: 'varchar', length: MAX_FIRST_NAME_LENGTH, nullable: false })
  @ApiModelProperty({ type: 'string', nullable: false, required: true, example: 'Vadim' })
  firstName: string;

  @Column({ type: 'varchar', length: MAX_MIDDLE_NAME_LENGTH, nullable: false })
  @ApiModelProperty({ type: 'string', nullable: false, required: true, example: 'Vadimovich' })
  middleName: string;

  @Column({ type: 'varchar', length: MAX_LAST_NAME_LENGTH, nullable: false })
  @ApiModelProperty({ type: 'string', nullable: false, required: true, example: 'Vadimov' })
  lastName: string;

  @Column({ type: 'varchar', length: MAX_EMAIL_LENGTH, nullable: false })
  @ApiModelProperty({ type: 'string', nullable: false, required: true, example: 'vadimovich@mail.com', pattern: '*@*.*' })
  email: string;

  @Column({ type: 'bigint', nullable: true })
  @ApiModelProperty({ type: 'bigint', minimum: 0, nullable: true, required: false, example: 88005553535 })
  phone: number;

  @Column({ type: 'date', default: null })
  @ApiModelProperty({ type: 'date', nullable: true, default: null, required: false, example: '2010-02-03' })
  birthday: Date;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  @ApiModelProperty({ type: 'string', enum: ['male', 'female'], nullable: true, required: false, example: 'male' })
  gender: Gender;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  @ApiModelProperty({ type: 'date', nullable: false, default: 'CURRENT_TIMESTAMP', required: false, example: '2019-11-08T14:49:20.000Z' })
  readonly createdAt: number;

  @Column({ type: 'varchar', default: null, nullable: true, length: 100 })
  @ApiModelProperty({ type: 'string', nullable: true, default: null, required: false, example: 'person-service' })
  updatedBy: string;

  @Column({ type: 'timestamp', default: null, nullable: true })
  @ApiModelProperty({ type: 'date', nullable: true, default: null, required: false, example: '2019-12-08T14:49:20.000Z' })
  updatedAt: number;
}
