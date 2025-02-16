import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UndefinedCheckPipe implements PipeTransform {
  transform<T>(value: T): T {
    if (value === undefined) {
      throw new BadRequestException('Required parameter is missing');
    }
    return value;
  }
}
