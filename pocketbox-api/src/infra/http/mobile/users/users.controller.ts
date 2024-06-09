import { CreateNewUser } from '@/application/use-cases/create-new-user';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly createNewUser: CreateNewUser) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createNewUser.execute(createUserDto);
  }
}
