import dayjs from 'dayjs';
import { RATING_STARS } from './const';

const calculateRating = (rating: number, stars: number = RATING_STARS) => window.Math.round(rating) * 100 / stars;

const formatDateComment = (date: string) => dayjs(date).format('MMMM YYYY');

function sortDay(firstReview: string, secondReview: string) {
  const firstPointDate = dayjs(firstReview);
  const secondPointDate = dayjs(secondReview);
  return firstPointDate.valueOf() - secondPointDate.valueOf();
}

export { calculateRating, formatDateComment, sortDay };
