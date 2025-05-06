import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { CommentType } from '../../types/review-type';
import { City, OfferType } from '../../types/offer-type';
import { useParams } from 'react-router-dom';
import { calculateRating } from '../../utils';
import ReviewForm from '../../components/review-form/review-form';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';


type OfferScreenType = {
  propsOffers: OfferType[];
  propsReview: CommentType[];
  defaultCity: City;
}

function Offer({ propsOffers, propsReview, defaultCity }: OfferScreenType) {
  const { id } = useParams();

  const currentOffer = propsOffers.filter((item) => item.id.toString() === id);

  if (!currentOffer) {
    return null;
  }

  const [{ image, isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description, city }] = currentOffer;

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {image.slice(0, 6).map((item) => (
                <div className="offer__image-wrapper" key={item}>
                  <img
                    className="offer__image"
                    src={item}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <div className="offer__mark"><span>Premium</span></div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className={`offer__bookmark-icon ${isFavorite ? 'offer__bookmark-icon--active' : ''}`} width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: calculateRating(rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What`s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => <li className="offer__inside-item" key={good}>{good}</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  <span className="offer__user-status">{host.isPro ? 'Pro' : ''}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewForm />
                <Reviews reviewsProp={propsReview} />
              </section>

            </div>
          </div>
          <Map city={city || defaultCity} offers={propsOffers} blockMap={'offer'} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {propsOffers.map((offer) => (
                <PlaceCard
                  key={offer.id}
                  offer={{ ...offer }}
                  block='near-places'
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default Offer;
