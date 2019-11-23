import { NestMiddleware } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogEntity } from '../logger/log.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class LoggerMiddleware implements NestMiddleware {
  constructor(@InjectRepository(LogEntity) private readonly logger: Repository<LogEntity>) {
  }

  use(req: Request, res: Response, next: () => void): void {
    console.log(res);
    /*const info: AddLogDto = {
      status: 1,
    };*/
    next();
  }
}
