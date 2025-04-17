import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { CityLocations, SortBy } from '../../const';
import { OfferType } from '../../types/offer-type';
import ListOffers from '../../components/List-offers/List-offers';

type PlacesProps = {
  placesCount: number;
  propsOffers: OfferType[];
}

function MainScreen({ placesCount, propsOffers }: PlacesProps): JSX.Element {

  const activeSort = SortBy.Popular;
  const [...offersAll] = propsOffers;

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CityLocations.map((city) => (
                <li key={city} className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  {activeSort}
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  {Object.values(SortBy).map((sort, index) => (
                    <li key={sort}
                      className="places__option places__option--active"
                      tabIndex={index}
                    >
                      {sort}
                    </li>))}
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <ListOffers propsOffer={offersAll} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
