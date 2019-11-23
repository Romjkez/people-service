import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddLogDto } from '../logger/dto/add-log.dto';
import { LogService } from '../logger/log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(
        tap(r => {
          const res: Response = context.switchToHttp().getResponse();
          const req: Request = context.switchToHttp().getRequest();
          const log: AddLogDto = {
            status: (res as any).statusCode,
            reqHeaders: req.headers,
            reqBody: req.body,
            resHeaders: (res as any).getHeaders(),
            resBody: r,
            path: req.url,
            date: new Date(),
            method: req.method,
          };
          console.log(log);
        }),
      );
  }

}
