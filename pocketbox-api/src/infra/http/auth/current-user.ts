import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@/application/entities/user';

export const CurrentUser = createParamDecorator(
  (
    data: unknown,
    context: ExecutionContext,
  ): Pick<User, 'id' | 'email' | 'firstName'> => {
    return context.switchToHttp().getRequest().user;
  },
);
