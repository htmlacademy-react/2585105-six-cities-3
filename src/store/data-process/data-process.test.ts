import { dataProcess } from './data-process';
import { DEFAULT_CITY, SortBy } from '../../const';
import { OfferType } from '../../types/offer-type';
import { fetchOffersAction } from '../api-actions';


const mockOffers: OfferType[] = [
  { id: '1', title: 'Offer 1', isFavorite: false, city: { name: 'Paris' } },
  { id: '2', title: 'Offer 2', isFavorite: true, city: { name: 'Cologne' } },
] as unknown as OfferType[];

describe('Reducer: dataProcess', () => {
  it('should return initial state with undefined state and empty action', () => {
    const initialState = {
      offers: [],
      selectedCity: DEFAULT_CITY,
      loadingStatus: false,
      activeSort: SortBy.Popular,
    };

    expect(dataProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should update offers with "setOffers" action', () => {
    const state = {
      offers: [],
      selectedCity: DEFAULT_CITY,
      loadingStatus: true,
      activeSort: SortBy.Popular,
    };

    const action = dataProcess.actions.setOffers(mockOffers);
    const result = dataProcess.reducer(state, action);

    expect(result.offers).toEqual(mockOffers);
    expect(result.loadingStatus).toBe(true); // Не должно измениться
  });

  it('should change city with "setCityName" action', () => {
    const state = {
      offers: [],
      selectedCity: DEFAULT_CITY,
      loadingStatus: false,
      activeSort: SortBy.Popular,
    };

    const newCity = 'Hamburg';
    const action = dataProcess.actions.setCityName(newCity);
    const result = dataProcess.reducer(state, action);

    expect(result.selectedCity).toBe(newCity);
  });

  it('should update favorite status correctly with "setFavoriteStatus"', () => {
    const state = {
      offers: [...mockOffers],
      selectedCity: DEFAULT_CITY,
      loadingStatus: false,
      activeSort: SortBy.Popular,
    };

    const action = dataProcess.actions.setFavoriteStatus({
      offerId: '1',
      status: true
    });

    const result = dataProcess.reducer(state, action);

    expect(result.offers[0].isFavorite).toBe(true);
    expect(result.offers[1].isFavorite).toBe(true); // Осталось без изменений
  });

  it('should handle fetchOffersAction.pending', () => {
    const state = {
      offers: [...mockOffers],
      selectedCity: DEFAULT_CITY,
      loadingStatus: false,
      activeSort: SortBy.Popular,
    };

    const action = fetchOffersAction.pending;
    const result = dataProcess.reducer(state, action);

    expect(result.offers).toEqual([]);
    expect(result.loadingStatus).toBe(true);
  });

  it('should handle fetchOffersAction.fulfilled', () => {
    const state = {
      offers: [],
      selectedCity: DEFAULT_CITY,
      loadingStatus: true,
      activeSort: SortBy.Popular,
    };

    const action = fetchOffersAction.fulfilled(mockOffers, '', undefined);
    const result = dataProcess.reducer(state, action);

    expect(result.offers).toEqual(mockOffers);
    expect(result.loadingStatus).toBe(false);
  });

  it('should handle fetchOffersAction.rejected', () => {
    const state = {
      offers: [],
      selectedCity: DEFAULT_CITY,
      loadingStatus: true,
      activeSort: SortBy.Popular,
    };

    const action = fetchOffersAction.rejected;
    const result = dataProcess.reducer(state, action);

    expect(result.offers).toEqual([]);
    expect(result.loadingStatus).toBe(false);
  });
});
