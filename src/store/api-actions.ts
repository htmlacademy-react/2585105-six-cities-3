import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OfferType } from '../types/offer-type';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { loadComments, loadNearOffer, loadOffer, loadOffers, redirectToRoute, requireAuthorization, setOfferDataLoadingStatus } from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { CommentType } from '../types/review-type';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOfferDataLoadingStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(setOfferDataLoadingStatus(false));
    dispatch(loadOffers(data));
  });

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization({
        status: AuthorizationStatus.Auth,
        user: null,
      }));
    } catch {
      dispatch(requireAuthorization({
        status: AuthorizationStatus.NotAuth,
        user: null,
      }));
    }
  }
);

export const loginAction = createAsyncThunk<{ success: boolean }, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data: UserInfo } = await api.post<UserData>(APIRoute.Login, { email, password });
      const { token } = UserInfo;
      saveToken(token);
      dispatch(requireAuthorization({
        status: AuthorizationStatus.Auth,
        user: UserInfo
      }));
      dispatch(redirectToRoute(AppRoute.Main));
      return { success: true, token };
    } catch {
      return { success: false };
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization({
      status: AuthorizationStatus.NotAuth,
      user: null
    }));
  });

export const fetchOffer = createAsyncThunk<OfferType, OfferType['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('fetchOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
    console.log({ data });
    return data;
  }
);

export const fetchNearOffer = createAsyncThunk<void, OfferType['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('fetchNearOffer',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferType[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(loadNearOffer(data));
  }
);

export const fetchReview = createAsyncThunk<void, OfferType['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('fetchReview',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<CommentType[]>(`${APIRoute.Comments}/${offerId}`);
    dispatch(loadComments(data));
  }
);
