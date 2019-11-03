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

  @Column({ type: 'varchar', length: 255, nullable: false })
  middleName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
  email: string;

  @Column({ type: 'date', default: null })
  birthday: Date;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  gender: Gender;

  @Column({ type: 'timestamp', default: Date.now(), nullable: false })
  readonly createdAt: number;

  @Column({ type: 'varchar', default: null, nullable: true })
  updatedBy: string;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: number;
}
