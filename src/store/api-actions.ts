import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OfferType } from '../types/offer-type';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { CommentType } from '../types/review-type';
import { CommentData } from '../types/comment-data';
import { createAPI } from '../services/api';

const MAX_OFFER_NEAR = 3;

type ApiAction = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchOffersAction = createAsyncThunk<OfferType[], undefined, ApiAction>('data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    return data;
  });

export const checkAuthAction = createAsyncThunk<void, undefined, ApiAction>('user/checkAuth',
  async (_arg, { extra: api }) => {
    await api.get(APIRoute.Login);
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, ApiAction>('user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ApiAction>('user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  });

export const fetchOfferById = async function (offerId: string) {
  const api = createAPI();
  const offerById = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
  if (offerById.status) {
    const nearOffers = await api.get<OfferType[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    const reviews = await api.get<CommentType[]>(`${APIRoute.Comments}/${offerId}`);
    return {
      offer: offerById.data,
      nearOffers: nearOffers.data.slice(0, MAX_OFFER_NEAR),
      reviews: reviews.data
    };
  }
  return null;
};

export const sendFormComment = createAsyncThunk<CommentData, CommentData, ApiAction>('data/sendFormComment',
  async ({ idComment, comment, rating }, { extra: api }) => {
    const { data } = await api.post<CommentData>(`${APIRoute.Comments}/${idComment}`, { comment, rating });
    return data;
  }
);
