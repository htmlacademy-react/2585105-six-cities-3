import { DEFAULT_CITY, SortBy } from '../../const';
import { dataProcess } from './data-process';
import { fetchOffersAction } from '../api-actions';
import { OfferType } from '../../types/offer-type';

describe('dataProcess reducer', () => {
  const initialState = {
    offers: [],
    selectedCity: DEFAULT_CITY,
    loadingStatus: false,
    activeSort: SortBy.Popular,
  };

  const mockOffers: OfferType[] = [
    {
      id: '1',
      title: 'Test Offer 1',
      type: 'apartment',
      price: 100,
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13
        }
      },
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'image1.jpg',
      description: 'Test description 1',
      bedrooms: 2,
      goods: ['Wi-Fi', 'Kitchen'],
      host: {
        name: 'Host 1',
        avatarUrl: 'avatar1.jpg',
        isPro: false,
        id: 1
      },
      maxAdults: 2,
      images: ['image1.jpg', 'image2.jpg']
    }
  ];

  it('should return initial state when given an empty action', () => {
    expect(dataProcess.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('setOffers', () => {
    it('should update offers', () => {
      const state = dataProcess.reducer(initialState, dataProcess.actions.setOffers(mockOffers));
      expect(state.offers).toEqual(mockOffers);
    });
  });

  describe('setCityName', () => {
    it('should update selected city', () => {
      const newCity = 'Amsterdam';
      const state = dataProcess.reducer(initialState, dataProcess.actions.setCityName(newCity));
      expect(state.selectedCity).toBe(newCity);
    });
  });

  describe('changeSorting', () => {
    it('should update active sort', () => {
      const newSort = SortBy.PriceUp;
      const state = dataProcess.reducer(initialState, dataProcess.actions.changeSorting(newSort));
      expect(state.activeSort).toBe(newSort);
    });
  });

  describe('setFavoriteStatus', () => {
    it('should update favorite status of an offer', () => {
      const stateWithOffers = {
        ...initialState,
        offers: mockOffers
      };
      const action = {
        offerId: '1',
        status: true
      };
      const state = dataProcess.reducer(stateWithOffers, dataProcess.actions.setFavoriteStatus(action));
      expect(state.offers[0].isFavorite).toBe(true);
    });
  });

  describe('fetchOffersAction', () => {
    it('should handle fetchOffersAction.pending', () => {
      const state = dataProcess.reducer(initialState, { type: fetchOffersAction.pending.type });
      expect(state.offers).toEqual([]);
      expect(state.loadingStatus).toBe(true);
    });

    it('should handle fetchOffersAction.fulfilled', () => {
      const state = dataProcess.reducer(
        { ...initialState, loadingStatus: true },
        { type: fetchOffersAction.fulfilled.type, payload: mockOffers }
      );
      expect(state.offers).toEqual(mockOffers);
      expect(state.loadingStatus).toBe(false);
    });

    it('should handle fetchOffersAction.rejected', () => {
      const state = dataProcess.reducer(
        { ...initialState, loadingStatus: true },
        { type: fetchOffersAction.rejected.type }
      );
      expect(state.loadingStatus).toBe(false);
    });
  });
});
