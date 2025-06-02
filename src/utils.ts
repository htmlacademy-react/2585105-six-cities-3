import dayjs from 'dayjs';
import { CITY_LOCATIONS, RATING_STARS, SortBy } from './const';
import { CommentType } from './types/review-type';
import { OfferType } from './types/offer-type';

const calculateRating = (rating: number, stars: number = RATING_STARS) => Math.round(rating * 100 / stars);

const formatDateComment = (date: string) => dayjs(date).format('MMMM YYYY');

function sortDayComment(a: CommentType, b: CommentType) {
  const date1 = dayjs(a.date);
  const date2 = dayjs(b.date);
  return date2.diff(date1);
}

function sortingByOption(offers: OfferType[], activeSort: string) {
  switch (activeSort) {
    case SortBy.PriceDown:
      return offers.toSorted((OfferA: OfferType, OfferB: OfferType) => OfferA.price - OfferB.price);
    case SortBy.PriceUp:
      return offers.toSorted((OfferA: OfferType, OfferB: OfferType) => OfferB.price - OfferA.price);
    case SortBy.Popular:
      return offers;
    case SortBy.TopRated:
      return offers.toSorted((OfferA: OfferType, OfferB: OfferType) => OfferB.rating - OfferA.rating);
    default:
      return offers;
  }
}
const getRandomCity = (): string => {
  const randomIndex = Math.floor(Math.random() * CITY_LOCATIONS.length);
  return CITY_LOCATIONS[randomIndex];
};
export { calculateRating, formatDateComment, sortDayComment, sortingByOption, getRandomCity };
