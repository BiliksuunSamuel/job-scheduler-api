import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRequest } from 'src/dtos/userDtos/user.request.dto';
import { User } from 'src/schemas/user.schema';
import { generateId } from 'src/utils';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userRepository: Model<User>,
  ) {}

  //create user
  async createUser(request: UserRequest): Promise<User> {
    const doc = await this.userRepository.create({
      ...request,
      id: generateId(),
      createdAt: new Date(),
    });
    return this.getUserById(doc.id);
  }

  //get user by id
  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ id }).lean();
  }
}
