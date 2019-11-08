import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePersonDto } from '../person/dto/create-person.dto';
import { toCanonical } from '../utils/utils';

@Injectable()
export class CreatePersonPipe implements PipeTransform {
  /**
   * Transforms createPersonDto to proper format
   * @param opts
   * @param metadata
   */
  transform(opts: CreatePersonDto, metadata: ArgumentMetadata): CreatePersonDto {
    return Object.assign(opts, {
      firstName: toCanonical(opts.firstName),
      lastName: toCanonical(opts.lastName),
      middleName: toCanonical(opts.middleName),
      email: opts.email.toLowerCase(),
    });
  }
}
