import { userProcess } from './user-process';
import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

import { UserProcess } from '../../types/state';
import { UserData } from '../../types/user-data';

describe('UserProcess slice', () => {
  const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: null
  };


  const mockUser: UserData = {
    email: 'test@example.com',
    token: 'test-token',
    name: 'Test User',
    avatarUrl: 'path/to/avatar.jpg',
    isPro: false

  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const state = userProcess.reducer(initialState, checkAuthAction.fulfilled);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userInfo).toBeNull();
  });

  it('should set "NotAuth" with "checkAuthAction.rejected" action', () => {
    const state = userProcess.reducer(initialState, checkAuthAction.rejected);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
    expect(state.userInfo).toBeNull();
  });

  it('should set "Auth" and user info with "loginAction.fulfilled" action', () => {
    const action = {
      type: loginAction.fulfilled.type,
      payload: mockUser
    };

    const state = userProcess.reducer(initialState, action);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userInfo).toEqual(mockUser);
  });

  it('should set "NotAuth" with "loginAction.rejected" action', () => {
    const state = userProcess.reducer(initialState, loginAction.rejected);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
    expect(state.userInfo).toBeNull();
  });

  it('should set "NotAuth" with "logoutAction.fulfilled" action', () => {
    const loggedInState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: mockUser
    };

    const state = userProcess.reducer(loggedInState, logoutAction.fulfilled);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
    expect(state.userInfo).toBeNull();
  });

  it('should set "Unknown" with "logoutAction.rejected" action', () => {
    const loggedInState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: mockUser
    };

    const state = userProcess.reducer(loggedInState, logoutAction.rejected);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Unknown);
    expect(state.userInfo).toBeNull();
  });
});
