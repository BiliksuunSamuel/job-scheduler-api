import { Prop, Schema } from '@nestjs/mongoose';
import { CronExpression } from '@nestjs/schedule';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Schedules {
  @ApiProperty()
  @Prop({ required: true })
  expression: CronExpression;

  @ApiProperty()
  @Prop({ required: true })
  jobName: string;

  @ApiProperty()
  @Prop({ required: true })
  endDate: Date;

  @ApiProperty()
  @Prop({ required: true })
  callbackUrl: string;

  @ApiProperty()
  @Prop({ required: true })
  id: string;

  @ApiProperty()
  @Prop({ required: true })
  createdAt: Date;
}
