import { UserData } from './user-data';

export type AuthUserData = {
  status: string;
  user: UserData | null;
}
