import { describe, expect, it, vi } from 'vitest';
import { fetchOffersAction } from '../api-actions';
import { APIRoute } from '../../const';
import type { AxiosInstance } from 'axios';

describe('fetchOffersAction', () => {
  it('should dispatch pending and fulfilled actions', async () => {
    const mockApi = {
      get: vi.fn().mockResolvedValue({
        data: [{ id: '1', title: 'Test Offer' }]
      })
    } as unknown as AxiosInstance;

    const dispatch = vi.fn();
    const getState = vi.fn();

    const thunk = fetchOffersAction();
    await thunk(dispatch, getState, mockApi);

    expect(mockApi.get).toHaveBeenCalledWith(APIRoute.Offers);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ type: fetchOffersAction.pending.type })
    );
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: fetchOffersAction.fulfilled.type,
        payload: [{ id: '1', title: 'Test Offer' }]
      })
    );
  });
});
