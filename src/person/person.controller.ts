import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class PersonController {
  @Get()
  @HttpCode(200)
  defaultAnswer() {
    return { status: 'ok' };
  }
}
