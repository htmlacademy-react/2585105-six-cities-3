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

export enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
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

export const URL_MARKER_DEFAULT = 'img/pin-active.svg';

export const URL_MARKER_CURRENT = 'img/pin.svg';
