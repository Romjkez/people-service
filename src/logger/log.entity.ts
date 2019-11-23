import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

@Entity()
export class LogEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'enum', nullable: false, enum: HTTPMethod })
  method: string;

  @Column({ type: 'json', nullable: true })
  reqBody: object;

  @Column({ type: 'json', nullable: true })
  reqHeaders: object;

  @Column({ type: 'json', nullable: true })
  resHeaders: object;

  @Column({ type: 'json', nullable: true })
  resBody: object;

  @Column({ type: 'int', nullable: false })
  status: HttpStatus;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  readonly date: number;

  @Column({ type: 'varchar', nullable: false })
  source: string;
}
