import { store } from '../store';
import { setError } from '../store/action';
import { clearErrorActions } from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorActions());
};
