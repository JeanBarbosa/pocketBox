import { User } from '@/application/entities/user';
import { Document } from 'mongoose';

export class MongoDBUserMapper {
  static toMongoDB(user: User) {
    return {
      firstName: user.firstName,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(data: Document & User): User {
    return new User({
      id: data._id.toString(),
      firstName: data.firstName,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
