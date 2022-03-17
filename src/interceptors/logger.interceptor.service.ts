import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { Observable } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    this.logger.info({
      params: req.params,
      query: req.query,
      body: req.body,
    });
    return next.handle();
  }
}
