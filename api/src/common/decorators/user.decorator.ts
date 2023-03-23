import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  // if route is protected, there is a user set
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }
  // if route is not protected, there is no user set
  return null;
});
