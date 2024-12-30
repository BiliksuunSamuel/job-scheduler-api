import { Injectable, Logger } from '@nestjs/common';
import { ApiResponseDto } from 'src/dtos/responseDtos/api.response.dto';
import { UserRequest } from 'src/dtos/userDtos/user.request.dto';
import { CommonResponses } from 'src/helpers/api.response.helper';
import { UsersRepository } from 'src/repositories/users.repository';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  //create user
  async createAsync(request: UserRequest): Promise<ApiResponseDto<User>> {
    try {
      this.logger.debug('creating user', request);
      const res = await this.usersRepository.createUser(request);
      return CommonResponses.createdResponse<User>(res);
    } catch (error) {
      this.logger.error(
        'an error occurred while creating user',
        request,
        error,
      );
      return CommonResponses.internalServerErrorResponse<User>();
    }
  }
}
