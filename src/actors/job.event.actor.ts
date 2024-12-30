import { Injectable, Logger } from '@nestjs/common';
import { BaseActor } from './base.actor';
import { spawnStateless } from 'nact';
import { SchedulesRepository } from 'src/repositories/schedules.repository';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ProxyHttpService } from 'src/services/proxy-http.service';

@Injectable()
export class JobEventActor extends BaseActor {
  private readonly logger = new Logger(JobEventActor.name);
  constructor(
    private readonly schedulesRepository: SchedulesRepository,
    private readonly scheduleRegistry: SchedulerRegistry,
    private readonly proxyHttpService: ProxyHttpService,
  ) {
    super();
  }

  //handle job event
  handleJobScheduleEvent = spawnStateless(
    this.system,
    async (msg: string, ctx) => {
      try {
        this.logger.debug('handling job schedule event', msg, ctx.name);
        const schedule = await this.schedulesRepository.getById(msg);
        if (!schedule) {
          this.logger.error('schedule not found', msg);
          return;
        }

        //if the end date is less than the current date, remove the job
        if (schedule.endDate < new Date()) {
          this.logger.debug('deleting job', schedule);
          this.scheduleRegistry.deleteCronJob(schedule.jobName);
          await this.schedulesRepository.deleteById(schedule.id);
          return;
        }

        //log the job
        this.logger.debug('job is running', schedule);
        const response = await this.proxyHttpService.request({
          method: 'post',
          url: schedule.callbackUrl,
        });
        this.logger.debug(
          'response from sending schedule callback',
          response,
          schedule,
        );
      } catch (error) {
        this.logger.error(
          'an error occurred while handling job schedule event',
          msg,
          error,
        );
      }
    },
  );
}
