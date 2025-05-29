import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { checkAuthAction, fetchOffersAction, loginAction, logoutAction } from './api-actions';
import { APIRoute, AuthorizationStatus } from '../const';
import { extractActionsTypes } from '../utils/mocks';
import { State } from '../types/state';
import { AppDispatch } from '../types/state';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxios = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action<string>, AppDispatch>(middleware);

  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NotAuth, userInfo: null },
      DATA: { offers: [], selectedCity: 'Paris', loadingStatus: false, activeSort: 'Popular' }
    } as State);
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" with offers', async () => {
      const mockOffers = [{
        id: '1',
        title: 'Test Offer',
        type: 'apartment',
        price: 100,
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13
          }
        },
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13
        },
        isFavorite: false,
        isPremium: false,
        rating: 4,
        previewImage: 'image.jpg',
        description: 'Test description',
        bedrooms: 2,
        goods: ['Wi-Fi'],
        host: {
          name: 'Host',
          avatarUrl: 'avatar.jpg',
          isPro: false,
          id: 1
        },
        maxAdults: 2,
        images: ['image.jpg']
      }];

      mockAxios.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type
      ]);
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server error', async () => {
      mockAxios.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when server returns 200', async () => {
      mockAxios.onGet(APIRoute.Login).reply(200, []);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server returns 400', async () => {
      mockAxios.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" when server returns 200', async () => {
      const mockUser = { login: 'test@test.com', password: '123456' };
      const mockServerReply = { token: 'secret' };

      mockAxios.onPost(APIRoute.Login).reply(200, mockServerReply);

      await store.dispatch(loginAction(mockUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type
      ]);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" when server returns 400', async () => {
      const mockUser = { login: 'test@test.com', password: '123456' };

      mockAxios.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(mockUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server returns 204', async () => {
      mockAxios.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type
      ]);
    });
  });
});
