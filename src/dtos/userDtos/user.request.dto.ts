import { ApiProperty } from '@nestjs/swagger';

export class UserRequest {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  contact: string;
}
