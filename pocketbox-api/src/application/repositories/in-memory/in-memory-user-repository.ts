import { User } from '../../entities/user';
import { UserRepository } from '../user-repository';

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  constructor() {}

  async create(data: User): Promise<User> {
    const length = this.items.push(data);
    return this.items[length - 1];
  }

  async findOne(email: string): Promise<User> {
    return this.items.find((item) => item.email === email);
  }
}
