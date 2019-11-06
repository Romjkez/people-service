import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundFieldsException extends HttpException {
  constructor(options: SearchParamsWithError) {
    super(options, HttpStatus.NOT_FOUND);
  }
}

export interface SearchParams {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

export interface SearchParamsWithError {
  data: SearchParams;
  message: string;
}
