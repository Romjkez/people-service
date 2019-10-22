import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { typeOrmOptions } from '../config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    PersonModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
  }
}
