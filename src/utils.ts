import dayjs from 'dayjs';
import { RATING_STARS } from './const';
import { CommentType } from './types/review-type';

const calculateRating = (rating: number, stars: number = RATING_STARS) => Math.round(rating * 100 / stars);

const formatDateComment = (date: string) => dayjs(date).format('MMMM YYYY');

function sortDayComment(a: CommentType, b: CommentType) {
  const date1 = dayjs(a.date);
  const date2 = dayjs(b.date);
  return date2.diff(date1);
}

export { calculateRating, formatDateComment, sortDayComment };
