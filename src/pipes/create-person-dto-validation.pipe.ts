import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePersonDto } from '../person/dto/create-person.dto';

export const CREDENTIAL_REGEX: RegExp = /\d/;
export const BIRTHDAY_REGEX: RegExp = /\d{4}-\d{2}-\d{2}/;
export const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Injectable()
export class CreatePersonDtoValidationPipe implements PipeTransform {
  transform(value: CreatePersonDto, metadata: ArgumentMetadata): CreatePersonDto {
    if (CREDENTIAL_REGEX.test(value.firstName) && value.firstName.length > 255) {
      throw new BadRequestException('First name must not contain digits');
    } else if (CREDENTIAL_REGEX.test(value.middleName) && value.middleName.length > 255) {
      throw new BadRequestException('Middle name/patronymic must not contain digits');
    } else if (CREDENTIAL_REGEX.test(value.lastName) && value.lastName.length > 255) {
      throw new BadRequestException('Last name must not contain digits');
    } else if (!EMAIL_REGEX.test(value.email) && value.email.length > 150) {
      throw new BadRequestException('Email must be <= 150 symbols and be similar to format: example@mail.com');
    }
    return value;
  }
}
