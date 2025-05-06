import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';

export const changeCity = createAction<{ city: string }>('changeCity');
export const updateOffers = createAction<OfferType[]>('updateOffers');
