import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user';

interface CreateUserRequest {
  firstName: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateNewUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserRequest) {
    //Todo: Hash Password
    const product = new User({
      ...data,
    });

    return await this.userRepository.create(product);
  }
}
