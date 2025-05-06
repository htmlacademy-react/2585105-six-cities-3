export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NotAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const CITY_LOCATIONS = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const SortBy = {
  Popular: 'Popular',
  PriceDown: 'Price: low to high',
  PriceUp: 'Price: high to low',
  TopRated: 'Top rated first'
} as const;

export const RATING_STARS = 5;

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
