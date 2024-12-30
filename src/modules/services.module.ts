import { Module } from '@nestjs/common';
import { RepositoriesModule } from './repositories.module';
import { UsersService } from 'src/services/users.service';
import { SchedulesService } from 'src/services/schedules.service';
import { ActorModule } from './actor.module';
import { ProxyHttpService } from 'src/services/proxy-http.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduledJobsLoaderService } from 'src/services/scheduled.jobs.loader.service';

@Module({
  providers: [
    UsersService,
    SchedulesService,
    ProxyHttpService,
    ScheduledJobsLoaderService,
  ],
  imports: [
    RepositoriesModule,
    ActorModule,
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  exports: [
    UsersService,
    SchedulesService,
    ProxyHttpService,
    HttpModule,
    ScheduledJobsLoaderService,
  ],
})
export class ServicesModule {}
