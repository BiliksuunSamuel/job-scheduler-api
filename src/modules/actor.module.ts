import { Module } from '@nestjs/common';
import { JobEventActor } from 'src/actors/job.event.actor';
import { SchedulerActor } from 'src/actors/scheduler.actor';
import { ProxyHttpService } from 'src/services/proxy-http.service';
import { RepositoriesModule } from './repositories.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [SchedulerActor, JobEventActor, ProxyHttpService],
  imports: [
    RepositoriesModule,
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  exports: [SchedulerActor, JobEventActor],
})
export class ActorModule {}
