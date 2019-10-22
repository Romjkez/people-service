import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Person } from '../src/person/entity/person.entity';

export let typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.NODE_ENV === 'production' ? 'std-mysql' : 'localhost',
  port: 3306,
  username: 'std_247',
  password: 'qwerty123',
  database: 'std_247',
  entities: [Person],
  synchronize: true,
};
