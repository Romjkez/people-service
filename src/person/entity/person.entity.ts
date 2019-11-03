import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  male = 'male',
  female = 'female',
}

export const MAX_FIRST_NAME_LENGTH: number = 255;
export const MAX_MIDDLE_NAME_LENGTH: number = 255;
export const MAX_LAST_NAME_LENGTH: number = 255;
export const MAX_EMAIL_LENGTH: number = 150;

@Entity()
export class Person {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: MAX_FIRST_NAME_LENGTH, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: MAX_MIDDLE_NAME_LENGTH, nullable: false })
  middleName: string;

  @Column({ type: 'varchar', length: MAX_LAST_NAME_LENGTH, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: MAX_EMAIL_LENGTH, nullable: false, unique: true })
  email: string;

  @Column({ type: 'date', default: null })
  birthday: Date;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  gender: Gender;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  readonly createdAt: number;

  @Column({ type: 'varchar', default: null, nullable: true, length: 100 })
  updatedBy: string;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: number;
}
