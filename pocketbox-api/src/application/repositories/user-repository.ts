import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(data: User): Promise<User>;
  abstract findOne(email: string): Promise<User | null>;
}
