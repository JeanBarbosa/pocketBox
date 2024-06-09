import { UserRepository } from '@/application/repositories/user-repository';
import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/application/entities/user';
import { MongoDBUserMapper } from '../mappers/mongoDB-user-mapper';

@Injectable()
export class MongoDBUserRepository implements UserRepository {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async create(createUserDto: User): Promise<User> {
    const createdUser = await this.userModel.create(
      MongoDBUserMapper.toMongoDB(createUserDto),
    );
    return MongoDBUserMapper.toDomain(createdUser);
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return MongoDBUserMapper.toDomain(user);
  }
}
