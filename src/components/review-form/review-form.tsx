import React, { ChangeEvent, useState } from 'react';

const MIN_LENGTH_COMMENT = 50;
const MAX_LENGTH_COMMENT = 300;

export default function ReviewForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');

  function handleCHangeText(evt: ChangeEvent<HTMLTextAreaElement>) {
    setText(evt.target.value);
  }

  function handleChangeRating(e: ChangeEvent<HTMLInputElement>) {
    setRating(e.target.value);
  }

  const isValid = text.length > MIN_LENGTH_COMMENT && text.length < MAX_LENGTH_COMMENT && rating !== '';

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((item) => (
          <React.Fragment key={item}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={item}
              id={`${item}-stars`}
              type="radio"
              onChange={handleChangeRating}
            />
            <label
              htmlFor="5-stars"
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={text}
        onChange={handleCHangeText}
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
          onSubmit={(evt) => {
            evt.preventDefault();
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
