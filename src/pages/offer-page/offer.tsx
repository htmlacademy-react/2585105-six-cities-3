import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { City } from '../../types/offer-type';
import { useParams } from 'react-router-dom';
import { calculateRating } from '../../utils';
import ReviewForm from '../../components/review-form/review-form';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchNearOffer, fetchOffer, fetchReview } from '../../store/api-actions';
import { dropOffer } from '../../store/action';
import { AuthorizationStatus } from '../../const';

const MAX_OFFER_NEAR = 3;

type OfferScreenType = {
  defaultCity: City;
}

function Offer({ defaultCity }: OfferScreenType) {
  const dispatch = useAppDispatch();
  const offerId = useParams();

  const currentOffer = useAppSelector((state) => state.offer);
  const offers = useAppSelector((state) => state.offers);
  const reviews = useAppSelector((state) => state.comments);
  const nearOffer = useAppSelector((state) => state.nearByOffer);
  const authUser = useAppSelector((state) => state.authorizationStatus);
  const nearOfferRendering = nearOffer?.slice(0, MAX_OFFER_NEAR);

  //console.log(reviews);
  useEffect(() => {
    if (offerId.id) {
      dispatch(fetchOffer(offerId.id));
      dispatch(fetchNearOffer(offerId.id));
      dispatch(fetchReview(offerId.id));
    }

    return () => {
      dispatch(dropOffer());
    };
  }, [offerId, dispatch]);

  //const {images, isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description, city} = currentOffer;

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
              {currentOffer?.images.slice(0, 6).map((item) => (
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
              {currentOffer?.isPremium && <div className="offer__mark"><span>Premium</span></div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer?.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className={`offer__bookmark-icon ${currentOffer?.isFavorite ? 'offer__bookmark-icon--active' : ''}`} width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  {currentOffer &&
                    <>
                      <span style={{ width: calculateRating(currentOffer.rating) }} />
                      <span className="visually-hidden">Rating</span>
                    </>}
                </div>
                <span className="offer__rating-value rating__value">{currentOffer?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{currentOffer?.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer?.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer?.maxAdults} {currentOffer?.maxAdults as number > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What`s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer?.goods.map((good) => <li className="offer__inside-item" key={good}>{good}</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer?.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer?.host.name}</span>
                  <span className="offer__user-status">{currentOffer?.host.isPro ? 'Pro' : ''}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer?.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {authUser === AuthorizationStatus.Auth ? <ReviewForm idComment={offerId.id} /> : ''}
                <Reviews reviewsProp={reviews} />
              </section>

            </div>
          </div>
          <Map city={currentOffer?.city || defaultCity} offers={offers} blockMap={'offer'} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearOfferRendering ? nearOfferRendering.map((offer) => (
                <PlaceCard
                  key={offer.id}
                  offer={{ ...offer }}
                  block='near-places'
                />
              )) : ''}
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default Offer;
