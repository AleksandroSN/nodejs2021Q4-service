import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";

interface ExceptionResponse {
  statusCode: number;
  url: string;
  exceptionRes: unknown;
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    let responseBody: ExceptionResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      url: "",
      exceptionRes: "Something Wrong",
    };

    let body = "";

    if (req.body) {
      body = req.body;
    }

    if (exception instanceof HttpException) {
      responseBody = {
        ...responseBody,
        ...{
          statusCode: exception.getStatus(),
          url: req.url,
          exceptionRes: exception.getResponse(),
        },
      };

      this.logger.error({ exception, body });

      res.status(responseBody.statusCode).send(responseBody);
    }
  }
}
