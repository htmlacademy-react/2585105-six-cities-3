import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectAuthStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const IsSelectUserAuth = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
export const selectUserInfo = (state: State) => state[NameSpace.User].userInfo;
