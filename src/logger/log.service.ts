import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from './log.entity';
import { Repository } from 'typeorm';
import { AddLogDto } from './dto/add-log.dto';
import { from, Observable } from 'rxjs';

export enum SortType {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

@Injectable()
export class LogService {
  constructor(@InjectRepository(LogEntity) private readonly logRepo: Repository<LogEntity>) {
  }

  add(logDTO: AddLogDto): Observable<LogEntity> {
    return from(this.logRepo.save(logDTO));
  }

  getAll(limit?: number, offset?: number, sort?: SortType): Observable<LogEntity[]> {
    return from(this.logRepo.find({
      order: { date: (sort || 'DESC') },
      skip: (offset && offset >= 0 ? offset : 0),
      take: (limit && limit >= 0 ? limit : 0),
    }));
  }
}
