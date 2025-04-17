import { OfferType } from '../../types/offer-type';


function PlaceCard(props: OfferType[]): JSX.Element {
  const newArrOffersElement = [];
  const [...offersAll] = props;
  for (let i = 0; i < offersAll.length; i++) {
    newArrOffersElement.push(
      <article className="cities__card place-card" key={offersAll[i].id}>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image"
              src={offersAll[i].image}
              width={260}
              height={200}
              alt="Place image"
            />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{offersAll[i].price}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button place-card__bookmark-button${offersAll[i].isFavorite ? '--active' : ''} button`}
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
              <span style={{ width: '80%' }} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{offersAll[i].description}</a>
          </h2>
          <p className="place-card__type">{offersAll[i].type}</p>
        </div>
      </article>
    );
  }

  return newArrOffersElement as unknown as JSX.Element;
}

export default PlaceCard;
