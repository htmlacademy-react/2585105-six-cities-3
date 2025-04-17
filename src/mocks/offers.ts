import { OfferType } from '../types/offer-type';

const offers: OfferType[] = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: [
      'Heating'
    ],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Angelina'
    },
    id: 256,
    image: '/markup/img/apartment-02.jpg',
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 5,
    previewImage: '/markup/img/apartment-02.jpg',
    price: 200,
    rating: 4.8,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment'
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 54.370216,
        longitude: 6.895168,
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
      avatarUrl: 'img/1.png',
      id: 1,
      isPro: true,
      name: 'Igor'
    },
    id: 745,
    image: '/markup/img/apartment-01.jpg',
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 53.35514938496378,
      longitude: 5.673877537499948,
      zoom: 5
    },
    maxAdults: 3,
    previewImage: '/markup/img/apartment-01.jpg',
    price: 150,
    rating: 4.6,
    title: 'An independent House',
    type: 'house'
  },
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 54.670216,
        longitude: 6.495168,
        zoom: 6
      },
      name: 'Brussels'
    },
    description: 'Quiet cozy and',
    goods: [
      'Heating',
      'Wi-Fi',
      'Kitchen',
      'Dishwasher',
      'Cabel TV'
    ],
    host: {
      avatarUrl: 'img/1.png',
      id: 2,
      isPro: false,
      name: 'Natasha'
    },
    id: 568,
    image: 'markup/img/apartment-03.jpg',
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 53.75514938496378,
      longitude: 5.675677537499948,
      zoom: 7
    },
    maxAdults: 1,
    previewImage: 'markup/img/apartment-03.jpg',
    price: 170,
    rating: 4.2,
    title: 'The building is green and from',
    type: 'room'
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 54.370216,
        longitude: 6.895168,
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
      avatarUrl: 'img/1.png',
      id: 1,
      isPro: true,
      name: 'Igor'
    },
    id: 1345,
    image: 'markup/img/apartment-small-03.jpg',
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 53.35514938496378,
      longitude: 5.673877537499948,
      zoom: 5
    },
    maxAdults: 3,
    previewImage: 'markup/img/apartment-small-03.jpg',
    price: 150,
    rating: 4.6,
    title: 'An independent House',
    type: 'house'
  },
  {
    bedrooms: 4,
    city: {
      location: {
        latitude: 43.670216,
        longitude: 8.495168,
        zoom: 6
      },
      name: 'Dusseldorf'
    },
    description: ['An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.', 'An independent House'],
    goods: [
      'Heating',
      'Wi-Fi',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
      'Towels'
    ],
    host: {
      avatarUrl: 'img/1.png',
      id: 4,
      isPro: false,
      name: 'Sasha'
    },
    id: 65,
    image: '/markup/img/apartment-02.jpg',
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 45.75514938496378,
      longitude: 7.675677537499948,
      zoom: 7
    },
    maxAdults: 6,
    previewImage: '/markup/img/apartment-02.jpg',
    price: 190,
    rating: 3.9,
    title: 'An independent House',
    type: 'hotel'
  }

];

export default offers;
