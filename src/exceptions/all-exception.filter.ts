import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";

// TO-DO send correct status
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    // const status = exception.getStatus();
    console.log(exception);
    res.send({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
