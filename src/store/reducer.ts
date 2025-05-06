import { createReducer } from '@reduxjs/toolkit';
import { changeCity, updateOffers } from './action';
import { OfferType } from '../types/offer-type';

type initialState = {
  selectedCity: string;
  offers: OfferType[];
}

export const initialState: initialState = {
  selectedCity: 'Paris',
  offers: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { city } = action.payload;
      state.selectedCity = city;
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
    });
});
