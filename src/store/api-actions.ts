import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OfferType } from '../types/offer-type';
import { APIRoute, AuthorizationStatus } from '../const';
import { loadOffers, requireAuthorization, serOfferDataLoadingStatus } from './action';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(serOfferDataLoadingStatus(true));
      const { data } = await api.get<OfferType[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch (error) {
      console.error('Ошибка загрузки предложений:', error);

    } finally {
      dispatch(serOfferDataLoadingStatus(false));
    }
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NotAuth));
    }
  }
);
