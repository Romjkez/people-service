import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  male = 'male',
  female = 'female',
}

@Entity()
export class Person {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 255, default: null })
  middleName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ type: 'date', default: null })
  birthday: Date;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  gender: Gender;
}
