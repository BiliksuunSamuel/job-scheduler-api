import { Injectable, Logger } from '@nestjs/common';
import { dispatch } from 'nact';
import { SchedulerActor } from 'src/actors/scheduler.actor';
import { ScheduleJobRequest } from 'src/dtos/requestDtos/schedule.job.request.dto';
import { ApiResponseDto } from 'src/dtos/responseDtos/api.response.dto';
import { CommonResponses } from 'src/helpers/api.response.helper';
import { SchedulesRepository } from 'src/repositories/schedules.repository';
import { Schedules } from 'src/schemas/schedules.schema';

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger(SchedulesService.name);
  constructor(
    private readonly schedulesRepository: SchedulesRepository,
    private readonly schedulerActor: SchedulerActor,
  ) {}

  //create schedule
  async createAsync(
    request: ScheduleJobRequest,
  ): Promise<ApiResponseDto<Schedules>> {
    try {
      this.logger.debug('creating schedule', request);
      const res = await this.schedulesRepository.createSchedule(request);

      //produce message to actor
      dispatch(this.schedulerActor.addJobToScheduleRegistry, res);
      return CommonResponses.createdResponse<Schedules>(res);
    } catch (error) {
      this.logger.error(
        'an error occurred while creating schedule',
        request,
        error,
      );
      return CommonResponses.internalServerErrorResponse<Schedules>();
    }
  }
}
