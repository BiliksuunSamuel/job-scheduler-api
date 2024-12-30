import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { DbContextModule } from './modules/dbcontext.module';
import { ServicesModule } from './modules/services.module';
import { RepositoriesModule } from './modules/repositories.module';
import { ControllersModule } from './modules/controllers.module';
import { ActorModule } from './modules/actor.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    DbContextModule,
    ServicesModule,
    RepositoriesModule,
    ControllersModule,
    ActorModule,
  ],
})
export class AppModule {}
