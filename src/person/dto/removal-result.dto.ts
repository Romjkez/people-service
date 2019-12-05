import { ApiModelProperty } from '@nestjs/swagger';

export class RemovalResultDto {
  @ApiModelProperty({ required: true, type: 'integer', nullable: false, minimum: 0, description: 'number of rows affected by request', example: 1 })
  affectedRows: number;

  @ApiModelProperty({ required: true, type: 'boolean', nullable: false, minimum: 0, description: 'was the request successful', example: true })
  ok: boolean;
}
