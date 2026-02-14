import { UserRole } from 'src/module/user/user.enum';

export interface IUserAuth {
  sub: string;
  username: string;
  role: UserRole;
}
