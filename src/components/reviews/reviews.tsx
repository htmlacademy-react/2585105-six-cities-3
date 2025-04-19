import { CommentType } from '../../types/review-type';
import { calculateRating, formatDateComment } from '../../utils';

type ReviewType = {
  reviewsProp: CommentType[];
}

export default function Reviews({ reviewsProp }: ReviewType) {
  return (
    <>
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviewsProp.length}</span></h2>
      <ul className="reviews__list">
        {reviewsProp.slice(0, 10).map(({ rating, id, user, comment, date }) => (
          <li className="reviews__item" key={id}>
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
        ))}
      </ul>
    </>

  );
}

