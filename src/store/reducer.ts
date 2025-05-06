import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './action';

type initialState = {
  selectedCity: string;
}

export const initialState: initialState = {
  selectedCity: 'Paris',
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    const { city } = action.payload;
    state.selectedCity = city;
  });
});
