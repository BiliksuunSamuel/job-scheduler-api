import { Module } from '@nestjs/common';
import { UsersRepository } from 'src/repositories/users.repository';
import { DbContextModule } from './dbcontext.module';
import { SchedulesRepository } from 'src/repositories/schedules.repository';

@Module({
  providers: [UsersRepository, SchedulesRepository],
  imports: [DbContextModule],
  exports: [UsersRepository, SchedulesRepository],
})
export class RepositoriesModule {}
