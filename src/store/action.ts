import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';

export const changeCity = createAction<string>('changeCity');
export const updateOffers = createAction<OfferType[]>('updateOffers');
export const changeSorting = createAction<string>('changeSorting');
