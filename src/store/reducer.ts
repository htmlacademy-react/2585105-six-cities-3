import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSorting, updateOffers } from './action';
import { OfferType } from '../types/offer-type';
import offers from '../mocks/offers';
import { CommentType } from '../types/review-type';
import { reviews } from '../mocks/reviews';
import { SortBy } from '../const';

type initialState = {
  selectedCity: string;
  offers: OfferType[];
  reviews: CommentType[];
  activeSort: string;
}

export const initialState: initialState = {
  selectedCity: 'Paris',
  offers,
  reviews,
  activeSort: SortBy.Popular
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.activeSort = action.payload;
    });
});
