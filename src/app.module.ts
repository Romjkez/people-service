import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { typeOrmOptions } from '../config/typeorm.config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PersonController } from './person/person.controller';
import { LogModule } from './logger/log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    PersonModule,
    LogModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {
  }

  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(PersonController);
  }
}
