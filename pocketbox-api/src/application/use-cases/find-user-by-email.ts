import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';

interface FindUserByEmailRequest {
  email: string;
}

@Injectable()
export class FindUserByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute({ email }: FindUserByEmailRequest) {
    const userExists = await this.userRepository.findOne(email);
    return userExists;
  }
}
