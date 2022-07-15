import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import User from 'src/users/user.entity';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request: { user: User } = context.switchToHttp().getRequest();

    return request.user;
  },
);
