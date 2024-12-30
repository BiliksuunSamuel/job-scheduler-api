import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Schedules } from 'src/schemas/schedules.schema';
import { Model } from 'mongoose';
import { ScheduleJobRequest } from 'src/dtos/requestDtos/schedule.job.request.dto';
import { generateId } from 'src/utils';

@Injectable()
export class SchedulesRepository {
  constructor(
    @InjectModel(Schedules.name)
    private readonly schedulesRepository: Model<Schedules>,
  ) {}

  //get all
  async getAll(): Promise<Schedules[]> {
    return await this.schedulesRepository.find().lean();
  }

  //delete by id
  async deleteById(id: string): Promise<void> {
    await this.schedulesRepository.deleteOne({ id });
  }

  //get by id
  async getById(id: string): Promise<Schedules> {
    return await this.schedulesRepository.findOne({ id }).lean();
  }

  //create schedule
  async createSchedule(request: ScheduleJobRequest): Promise<Schedules> {
    const doc = await this.schedulesRepository.create({
      ...request,
      id: generateId(),
      createdAt: new Date(),
    });

    return await this.getById(doc.id);
  }
}
