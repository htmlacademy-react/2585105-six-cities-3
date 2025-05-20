import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortBy } from '../../const';
import { DataProcess } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { OfferType } from '../../types/offer-type';


const initialState: DataProcess = {
  offers: [],
  selectedCity: DEFAULT_CITY,
  loadingStatus: false,
  activeSort: SortBy.Popular,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<OfferType[]>) {
      state.offers = action.payload;
    },
    setCityName(state, action: PayloadAction<string>) {
      state.selectedCity = action.payload;
    },
    changeSorting(state, action: PayloadAction<string>) {
      state.activeSort = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.loadingStatus = false;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.offers = [];
        state.loadingStatus = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.loadingStatus = false;
      });
  }
});

export const { setOffers, setCityName, changeSorting } = dataProcess.actions;
