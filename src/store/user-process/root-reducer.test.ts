import { describe, expect, test } from 'vitest';
import { Action } from 'redux';
import { rootReducer } from '../root-reducer';
import { NameSpace } from '../../const';

describe('Root Reducer', () => {
  test('should return initial state with correct structure', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' } as Action);
    expect(initialState).toHaveProperty(NameSpace.Data);
    expect(initialState).toHaveProperty(NameSpace.User);
  });

  test('should return same state for unknown action', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' } as Action);
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' } as Action);
    expect(newState).toEqual(initialState);
  });
});
