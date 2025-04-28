import dayjs from 'dayjs';
import { RATING_STARS } from './const';

const calculateRating = (rating: number, stars: number = RATING_STARS) =>
  Math.round(rating * 100 / stars);

const formatDateComment = (date: string) =>
  dayjs(date).format('MMMM YYYY');

function sortDay<T extends Record<string, string>>(fieldName: string) {
  return (a: T, b: T) =>
    dayjs(b[fieldName]).valueOf() - dayjs(a[fieldName]).valueOf();
}

export { calculateRating, formatDateComment, sortDay };
