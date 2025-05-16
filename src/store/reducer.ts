import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSorting, loadOffers, requireAuthorization, setOfferDataLoadingStatus, updateOffers } from './action';
import { OfferType } from '../types/offer-type';
import { CommentType } from '../types/review-type';
import { reviews } from '../mocks/reviews';
import { AuthorizationStatus, SortBy } from '../const';
import { UserData } from '../types/user-data';

type initialState = {
  selectedCity: string;
  offers: OfferType[];
  reviews: CommentType[];
  activeSort: string;
  authorizationStatus: string;
  loadingStatus: boolean;
  user: UserData | null;
  countFavoritesOffer: number;
}

export const initialState: initialState = {
  selectedCity: 'Paris',
  offers: [],
  reviews,
  activeSort: SortBy.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  loadingStatus: false,
  user: null,
  countFavoritesOffer: 0
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
      state.authorizationStatus = action.payload.status;
      state.user = action.payload.user;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.loadingStatus = action.payload;
    });
});
