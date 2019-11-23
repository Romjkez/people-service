import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { LogModule } from '../logger/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), LogModule],
  providers: [PersonService],
  controllers: [PersonController],
  exports: [TypeOrmModule],
})
export class PersonModule {
}
