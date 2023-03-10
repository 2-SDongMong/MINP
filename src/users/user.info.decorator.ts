import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserInfo = createParamDecorator(
( data: unknown, cxt: ExecutionContext) => {
  const request = cxt.switchToHttp().getRequest();
  return request.user;
  },
);