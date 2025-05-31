import { Link, useNavigate } from 'react-router-dom';
import { OfferType } from '../../types/offer-type';
import { calculateRating } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isSelectUserAuth } from '../../store/user-process/selectors';
import { AppRoute } from '../../const';
import { useState } from 'react';
import { postFavoriteStatus } from '../../store/api-actions';
import { setFavoriteStatus } from '../../store/data-process/data-process';

type CardPlace = {
  offer: OfferType;
  onFavoriteClick: (item:OfferType)=> void;
}


function OfferCard({ offer,onFavoriteClick }: CardPlace) {

  const { price, isFavorite, type, previewImage, isPremium, title, rating, id } = offer;
  const pathCard = `/offer/${id}`;
  const dispatch = useAppDispatch();
  const offerId = offer.id;
  const [status, setStatus] = useState<boolean>(isFavorite);
  const isAuthUser = useAppSelector(isSelectUserAuth);
  const navigate = useNavigate();

  const handleClickFavorite = () => {
    if (isAuthUser) {
      postFavoriteStatus(offerId, !status).then((item: OfferType) => {
        setStatus(item.isFavorite);
        dispatch(setFavoriteStatus({ offerId, status: item.isFavorite }));
        onFavoriteClick(item);
      });
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <article className={'near-places__card place-card'} >
      {isPremium && <div className="place-card__mark"> <span>Premium</span> </div>}
      <div className={'near-places__image-wrapper place-card__image-wrapper'}>
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
            onClick={handleClickFavorite}
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
            <span style={{ width: `${calculateRating(rating)}%` }} />
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

export default OfferCard;
