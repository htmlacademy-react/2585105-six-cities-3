
import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../../store/api-actions';
import { userProcess } from '../../store/user-process/user-process';


describe('userProcess reducer', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: null,
  };

  it('should return initial state when given an empty action', () => {
    expect(userProcess.reducer(undefined, { type: '' })).toEqual(initialState);
  });

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

  it('should handle loginAction.fulfilled', () => {
    const mockUser = { id: 1, name: 'Test User' };
    const action = { type: loginAction.fulfilled.type, payload: mockUser };
    const state = userProcess.reducer(initialState, action);

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userInfo).toEqual(mockUser);
  });

  it('should handle loginAction.rejected', () => {
    const action = { type: loginAction.rejected.type };
    const state = userProcess.reducer(initialState, action);

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
    expect(state.userInfo).toBeNull();
  });

  it('should handle logoutAction.fulfilled', () => {
    const loggedInState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: { id: 1, name: 'Test User' },
    };
    const action = { type: logoutAction.fulfilled.type };
    const state = userProcess.reducer(loggedInState, action);

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
    expect(state.userInfo).toBeNull();
  });

  it('should handle logoutAction.rejected', () => {
    const loggedInState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: { id: 1, name: 'Test User' },
    };
    const action = { type: logoutAction.rejected.type };
    const state = userProcess.reducer(loggedInState, action);

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Unknown);
    expect(state.userInfo).toBeNull();
  });
});
