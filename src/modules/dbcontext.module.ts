import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'src/configuration';
import { toDbCollection } from 'src/helpers/dbcontext.helper';
import { Schedules } from 'src/schemas/schedules.schema';
import { User } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(configuration().dbUrl),
    MongooseModule.forFeature([
      toDbCollection(User),
      toDbCollection(Schedules),
    ]),
  ],
  exports: [MongooseModule],
})
export class DbContextModule {}
