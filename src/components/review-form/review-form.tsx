import React, { ChangeEvent, FormEvent, useState } from 'react';

import { sendCommentForm } from '../../store/api-actions';
import { CurrentOfferType } from '../../pages/offer-page/offer';

import { CommentType } from '../../types/review-type';


const MIN_LENGTH_COMMENT = 50;
const MAX_LENGTH_COMMENT = 300;

type ReviewForm = {
  idComment: string | undefined;
  setCurrentOffer: (currentOffer: CurrentOfferType) => void;
  currentOffer: CurrentOfferType | null;
}

export type ReviewDataSentType = {
  comment: string;
  rating: number;
}

export default function ReviewForm({ idComment, setCurrentOffer, currentOffer }: ReviewForm) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  function handleRatingClick(evt: ChangeEvent<HTMLInputElement>) {
    setRating(+evt.target.value);
  }

  function handleChangeText(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!currentOffer) {
      return;
    }
    sendCommentForm(idComment as string, { comment, rating }).then((commentPost: CommentType) => {
      setCurrentOffer({ ...currentOffer, reviews: [commentPost, ...currentOffer.reviews] });
      setComment('');
      setRating(0);
    });
  }

  const isValid = comment.length > MIN_LENGTH_COMMENT && comment.length < MAX_LENGTH_COMMENT && rating !== 0;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((item) => (
          <React.Fragment key={item}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={item}
              id={`${item}-stars`}
              type="radio"
              onChange={handleRatingClick}
            />
            <label
              htmlFor={`${item}-stars`}
              className="reviews__rating-label form__rating-label"

            >
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleChangeText}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
