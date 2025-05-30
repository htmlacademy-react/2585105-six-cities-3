import { describe, expect, it } from 'vitest';
import type { Mock } from 'vitest';
import { fetchOffersAction } from '../api-actions';
import { APIRoute } from '../../const';
import { AxiosInstance } from 'axios';


type MockedAxiosInstance = AxiosInstance & {
  get: Mock;
};

describe('fetchOffersAction', () => {
  it('should work with direct mock', async () => {

    const mockApi: MockedAxiosInstance = {
      get: vi.fn() as Mock,
    } as any;

    const mockOffers = [{ id: '1', title: 'Direct Mock Offer' }];
    mockApi.get.mockResolvedValueOnce({ data: mockOffers });

    const dispatch = vi.fn();
    const getState = vi.fn();

    const thunk = fetchOffersAction();
    await thunk(dispatch, getState, mockApi);


    expect(mockApi.get).toHaveBeenCalledWith(APIRoute.Offers);

    const actions = dispatch.mock.calls.map((call: any) => call[0].type);
    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });
});
