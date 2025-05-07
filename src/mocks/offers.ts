import { OfferType } from '../types/offer-type';

const offers: OfferType[] = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.23,
        longitude: 4.54,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: [
      'Heating',
      'Kitchen'
    ],
    host: {
      avatarUrl: 'markup/img/avatar-angelina.jpg',
      id: 3,
      isPro: true,
      name: 'Angelina'
    },
    id: 256,
    image: ['/markup/img/apartment-02.jpg', '/markup/img/apartment-02.jpg', '/markup/img/apartment-02.jpg', '/markup/img/apartment-02.jpg', '/markup/img/apartment-02.jpg', '/markup/img/apartment-02.jpg', '/markup/img/apartment-02.jpg'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    maxAdults: 5,
    previewImage: '/markup/img/apartment-02.jpg',
    price: 200,
    rating: 4.8,
    title: 'Beautiful & luxurious studio at great location',
    type: 'Apartment'
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.23,
        longitude: 4.54,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'Quiet cozy and picturesque that hides behind ',
    goods: [
      'Heating',
      'Wi-Fi',
      'Kitchen'
    ],
    host: {
      avatarUrl: 'markup/img/avatar-angelina.jpg',
      id: 1,
      isPro: true,
      name: 'Igor'
    },
    id: 745,
    image: ['/markup/img/apartment-01.jpg'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 5
    },
    maxAdults: 3,
    previewImage: '/markup/img/apartment-01.jpg',
    price: 119,
    rating: 4.6,
    title: 'An independent House',
    type: 'House'
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.23,
        longitude: 4.54,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'Quiet cozy and picturesque that hides behind ',
    goods: [
      'Heating',
      'Wi-Fi',
      'Kitchen'
    ],
    host: {
      avatarUrl: 'markup/img/avatar-max.jpg',
      id: 1,
      isPro: true,
      name: 'Igor'
    },
    id: 1345,
    image: ['markup/img/apartment-small-03.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 5
    },
    maxAdults: 3,
    previewImage: 'markup/img/apartment-small-03.jpg',
    price: 150,
    rating: 4.6,
    title: 'An independent House',
    type: 'House'
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 48.5,
        longitude: 2.20,
        zoom: 10
      },
      name: 'Paris'
    },
    description: 'Quiet cozy and picturesque that hides behind ',
    goods: [
      'Heating',
      'Wi-Fi',
      'Kitchen'
    ],
    host: {
      avatarUrl: 'markup/img/avatar-max.jpg',
      id: 1,
      isPro: true,
      name: 'Igor'
    },
    id: 1345,
    image: ['markup/img/apartment-small-03.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 48.86461439756179,
      longitude: 2.3745008201536595,
      zoom: 5
    },
    maxAdults: 3,
    previewImage: 'markup/img/apartment-small-03.jpg',
    price: 150,
    rating: 4.6,
    title: 'An independent House Paris',
    type: 'House'
  }

];

export default offers;
