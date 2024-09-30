import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UndefinedCheckPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined) {
      throw new BadRequestException('Value should not be undefined (from the auth service UndefinedCheckPipe)');
    }
    return value; // Proceed with the value if it is not undefined
  }
}
