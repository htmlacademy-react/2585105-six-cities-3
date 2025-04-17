import { RATING_STARS } from './const';

const calculateRating = (rating: number, stars: number = RATING_STARS) => window.Math.round(rating) * 100 / stars;

export { calculateRating };
