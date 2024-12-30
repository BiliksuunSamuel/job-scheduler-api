import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/users.controller';
import { ServicesModule } from './services.module';
import { SchedulerController } from 'src/controllers/scheduler.controller';

@Module({
  controllers: [UsersController, SchedulerController],
  imports: [ServicesModule],
})
export class ControllersModule {}
