import { ForbiddenException } from '@nestjs/common';
import { IUserAuth } from '../user-auth.interface';
import { UserRole } from 'src/module/user/user.enum';

export function checkOwnerOrAdmin(
  user: IUserAuth,
  resource: { userId: string },
) {
  if (user.role === UserRole.ADMIN) {
    return;
  }

  if (resource.userId === user.sub) {
    return;
  }

  throw new ForbiddenException('Forbidden');
}
