import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { dispatch } from 'nact';
import { JobEventActor } from 'src/actors/job.event.actor';
import { SchedulesRepository } from 'src/repositories/schedules.repository';

@Injectable()
export class ScheduledJobsLoaderService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ScheduledJobsLoaderService.name);
  constructor(
    private readonly schedulesRepository: SchedulesRepository,
    private readonly scheduleRegistry: SchedulerRegistry,
    private readonly jobEventActor: JobEventActor,
  ) {}

  async onApplicationBootstrap() {
    try {
      this.logger.debug('loading scheduled jobs');
      const schedules = await this.schedulesRepository.getAll();

      schedules.forEach((item) => {
        const job = new CronJob(item.expression as string, () => {
          this.logger.debug(
            `job:[${item.jobName}] is running: expression:[${item.expression}]`,
            item.jobName,
            item.expression,
          );
          dispatch(this.jobEventActor.handleJobScheduleEvent, item.id);
        });
        this.scheduleRegistry.addCronJob(item.jobName, job as any);

        //starting the job
        job.start();
      });
      this.logger.debug(`scheduled jobs loaded:${schedules.length}`);
    } catch (error) {
      this.logger.error(
        'an error occurred while loading scheduled jobs',
        error,
      );
    }
  }
}
