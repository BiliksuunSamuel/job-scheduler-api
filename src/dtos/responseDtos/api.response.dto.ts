import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty()
  message?: string;
  @ApiProperty()
  data?: T;
  @ApiProperty()
  code: number;
}
