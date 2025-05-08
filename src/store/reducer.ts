import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSorting, loadOffers, requireAuthorization, updateOffers } from './action';
import { OfferType } from '../types/offer-type';
import { CommentType } from '../types/review-type';
import { reviews } from '../mocks/reviews';
import { AuthorizationStatus, SortBy } from '../const';

type initialState = {
  selectedCity: string;
  offers: OfferType[];
  reviews: CommentType[];
  activeSort: string;
  authorizationStatus: string;
}

export const initialState: initialState = {
  selectedCity: 'Paris',
  offers: [],
  reviews,
  activeSort: SortBy.Popular,
  authorizationStatus: AuthorizationStatus.Unknown
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
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
