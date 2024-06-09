import { User } from './user';
import { randomUUID } from 'node:crypto';

describe('User Entity', () => {
  it('should be able to create a user', () => {
    const user = new User({
      id: randomUUID(),
      firstName: 'Bob',
      email: 'bob@gmail.com',
      password: '123456',
    });

    expect(user).toBeTruthy();
  });
});
