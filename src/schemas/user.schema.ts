import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  contact: string;

  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  createdAt: Date;
}

//
