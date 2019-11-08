import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePersonDto } from '../person/dto/create-person.dto';
import { Gender } from '../person/entity/person.entity';

export const CREDENTIAL_REGEX: RegExp = /\d/;
export const BIRTHDDAY_REGEX: RegExp = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
export const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Injectable()
export class CreatePersonDtoValidationPipe implements PipeTransform {
  transform(value: CreatePersonDto, metadata: ArgumentMetadata): CreatePersonDto {
    if (CREDENTIAL_REGEX.test(value.firstName) || value.firstName.length > 255) {
      throw new BadRequestException('First name must not contain digits, length must be <= 255 symbols');
    } else if (CREDENTIAL_REGEX.test(value.middleName) || value.middleName.length > 255) {
      throw new BadRequestException('Middle name/patronymic must not contain digits, length must be <= 255 symbols');
    } else if (CREDENTIAL_REGEX.test(value.lastName) || value.lastName.length > 255) {
      throw new BadRequestException('Last name must not contain digits, length must be <= 255 symbols');
    } else if (!EMAIL_REGEX.test(value.email) || value.email.length > 150) {
      throw new BadRequestException('Email must be <= 150 symbols length, required format: *@*.*');
    } else if (!BIRTHDDAY_REGEX.test(value.birthday)) {
      throw new BadRequestException('Birthday must match the following format: yyyy-mm-dd; year/month/day must be valid');
    } else if (value.gender !== Gender.female && value.gender !== Gender.male) {
      throw new BadRequestException('Gender must be equal to `male`, `female` or null');
    }
    return value;
  }
}
