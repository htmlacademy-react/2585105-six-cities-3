import { Link } from 'react-router-dom';
import { OfferType } from '../../types/offer-type';
import { calculateRating } from '../../utils';

type CardPlace = {
  offer: OfferType;
  onCardHover?: (offerId: OfferType['id'] | null) => void;
}


function PlaceCard({ offer, onCardHover }: CardPlace) {

  const { price, isFavorite, type, previewImage, isPremium, title, rating, id } = offer;
  const pathCard = `/offer/${id}`;

  function handleMouseEnter() {
    onCardHover?.(id);
  }

  function handleMouseLeave() {
    onCardHover?.(null);
  }

  return (
    <article className="cities__card place-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isPremium && <div className="place-card__mark"> <span>Premium</span> </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={pathCard}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button place-card__bookmark-button${isFavorite ? '--active' : ''} button`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: calculateRating(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={pathCard}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );


}

export default PlaceCard;
