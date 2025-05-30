
import { AuthorizationStatus } from '../../const';
import { checkAuthAction } from '../../store/api-actions';
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

});
