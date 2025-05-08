import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<string>('changeCity');
export const updateOffers = createAction<OfferType[]>('updateOffers');
export const changeSorting = createAction<string>('changeSorting');
export const loadOffers = createAction<OfferType[]>('loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
