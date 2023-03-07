import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log("current user",request.user,"data",data)
    if (!data) return request.user;
    return request.user[data];
  },
);