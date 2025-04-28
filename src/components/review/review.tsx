import { CommentType } from '../../types/review-type';
import { calculateRating, formatDateComment } from '../../utils';

type ReviewPropType = {
  propReview: CommentType;
}

export default function Review({ propReview }: ReviewPropType) {
  const { rating, user, comment, date } = propReview;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: calculateRating(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>
          {formatDateComment(date)}
        </time>
      </div>
    </li>
  );
}
