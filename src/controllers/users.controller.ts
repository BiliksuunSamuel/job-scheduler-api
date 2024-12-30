import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserRequest } from 'src/dtos/userDtos/user.request.dto';
import { UsersService } from 'src/services/users.service';

@Controller('api/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //create user
  @Post()
  async createUser(@Body() request: UserRequest, @Res() response: Response) {
    const res = await this.usersService.createAsync(request);
    response.status(res.code).send(res);
  }
}
