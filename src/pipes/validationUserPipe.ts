import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
// import { ValidationExceptionUsers } from "../exceptions";

@Injectable()
export class ValidationUserPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      // throw new ValidationExceptionUsers(errors);
    }
    return value;
  }
}
