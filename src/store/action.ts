import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { AppRoute } from '../const';
import { AuthUserData } from '../types/auth-user-data';
import { CommentType } from '../types/review-type';

export const changeCity = createAction<string>('changeCity');
export const updateOffers = createAction<OfferType[]>('updateOffers');
export const changeSorting = createAction<string>('changeSorting');
export const loadOffers = createAction<OfferType[]>('loadOffers');
export const requireAuthorization = createAction<AuthUserData>('requireAuthorization');
export const setOfferDataLoadingStatus = createAction<boolean>('setOfferDataLoadingStatus');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const loadOffer = createAction<OfferType>('loadOffer');
export const loadNearOffer = createAction<OfferType[]>('loadNearOffer');
export const loadComments = createAction<CommentType[]>('loadComment');
export const dropOffer = createAction('dropOffer');
