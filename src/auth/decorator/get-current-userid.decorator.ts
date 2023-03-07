import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    console.log("들어옴?",context.switchToHttp().getRequest().user)
    return context.switchToHttp().getRequest()?.user?.id;
  },
);//'sub'에 있는 id 빼오기
