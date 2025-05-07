import { createReducer } from '@reduxjs/toolkit';
import { changeCity, updateOffers } from './action';
import { OfferType } from '../types/offer-type';
import offers from '../mocks/offers';
import { CommentType } from '../types/review-type';
import { reviews } from '../mocks/reviews';

type initialState = {
  selectedCity: string;
  offers: OfferType[];
  reviews: CommentType[];
}

export const initialState: initialState = {
  selectedCity: 'Paris',
  offers,
  reviews,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
    });
});
