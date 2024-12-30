import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ScheduleJobRequest } from 'src/dtos/requestDtos/schedule.job.request.dto';
import { SchedulesService } from 'src/services/schedules.service';

@Controller('api/job-scheduler')
@ApiTags('Job Scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulesService) {}

  //create schedule
  @Post()
  async createSchedule(
    @Body() request: ScheduleJobRequest,
    @Res() response: Response,
  ) {
    const res = await this.schedulerService.createAsync(request);
    response.status(res.code).send(res);
  }
}
