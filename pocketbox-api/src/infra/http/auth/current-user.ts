import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@/application/entities/user';

export type Auth = Pick<User, 'id' | 'email' | 'firstName'>;

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Auth => {
    return context.switchToHttp().getRequest().user;
  },
);
