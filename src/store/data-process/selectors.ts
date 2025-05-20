import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectOffers = (state: State) => state[NameSpace.Data].offers;
export const selectLoadingStatus = (state: State) => state[NameSpace.Data].loadingStatus;
export const selectCityName = (state: State) => state[NameSpace.Data].selectedCity;
export const selectActiveSort = (state: State) => state[NameSpace.Data].activeSort;
