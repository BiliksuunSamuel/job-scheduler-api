import { CronExpression } from '@nestjs/schedule';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ScheduleJobRequest {
  @ApiProperty({ default: CronExpression.EVERY_10_SECONDS })
  @IsEnum(CronExpression)
  @IsNotEmpty()
  expression: CronExpression;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  callbackUrl: string;
}
