import { Injectable, Logger } from '@nestjs/common';
import { BaseActor } from './base.actor';
import { SchedulerRegistry } from '@nestjs/schedule';
import { dispatch, spawnStateless } from 'nact';
import { Schedules } from 'src/schemas/schedules.schema';
import { CronJob } from 'cron';
import { JobEventActor } from './job.event.actor';

@Injectable()
export class SchedulerActor extends BaseActor {
  private readonly logger = new Logger(SchedulerActor.name);
  constructor(
    private readonly scheduleRegistry: SchedulerRegistry,
    private readonly jobEventActor: JobEventActor,
  ) {
    super();
  }

  //add job to schedule registry
  addJobToScheduleRegistry = spawnStateless(
    this.system,
    async (msg: Schedules, ctx) => {
      try {
        this.logger.debug('adding job to schedule registry', msg, ctx.name);
        const job = new CronJob(msg.expression as string, () => {
          this.logger.debug(
            `job:[${msg.jobName}] is running: expression:[${msg.expression}]`,
            msg.jobName,
            msg.expression,
          );
          dispatch(this.jobEventActor.handleJobScheduleEvent, msg.id);
        });
        this.scheduleRegistry.addCronJob(msg.jobName, job as any);

        //starting the job
        job.start();
      } catch (error) {
        this.logger.error(
          'an error occurred while adding job to schedule registry',
          msg,
          error,
        );
      }
    },
  );
}
