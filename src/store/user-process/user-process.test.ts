import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('userProcess reducer', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: null,
  };

  const mockUserData = {
    id: '1',
    email: 'test@test.com',
    token: 'token',
    name: 'Test User',
    avatarUrl: 'avatar.jpg',
    isPro: false
  };

  it('should return initial state when given an empty action', () => {
    expect(userProcess.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('checkAuthAction', () => {
    it('should handle checkAuthAction.fulfilled', () => {
      const action = { type: checkAuthAction.fulfilled.type };
      const state = userProcess.reducer(initialState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(state.userInfo).toBeNull();
    });

    it('should handle checkAuthAction.rejected', () => {
      const action = { type: checkAuthAction.rejected.type };
      const state = userProcess.reducer(initialState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
      expect(state.userInfo).toBeNull();
    });
  });

  describe('loginAction', () => {
    it('should handle loginAction.fulfilled', () => {
      const action = { type: loginAction.fulfilled.type, payload: mockUserData };
      const state = userProcess.reducer(initialState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(state.userInfo).toEqual(mockUserData);
    });

    it('should handle loginAction.rejected', () => {
      const action = { type: loginAction.rejected.type };
      const state = userProcess.reducer(initialState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
      expect(state.userInfo).toBeNull();
    });
  });

  describe('logoutAction', () => {
    it('should handle logoutAction.fulfilled', () => {
      const state = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUserData
      };
      const action = { type: logoutAction.fulfilled.type };
      const newState = userProcess.reducer(state, action);

      expect(newState.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
      expect(newState.userInfo).toBeNull();
    });

    it('should handle logoutAction.rejected', () => {
      const state = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUserData
      };
      const action = { type: logoutAction.rejected.type };
      const newState = userProcess.reducer(state, action);

      expect(newState.authorizationStatus).toBe(AuthorizationStatus.Unknown);
      expect(newState.userInfo).toBeNull();
    });
  });
});