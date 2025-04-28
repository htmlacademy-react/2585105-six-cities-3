import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { CityLocations, SortBy } from '../../const';
import { OfferType } from '../../types/offer-type';
import ListOffers from '../../components/List-offers/List-offers';
import Map from '../../components/map/map';
import { useState } from 'react';

type PlacesProps = {
  propsOffers: OfferType[];
}

function MainScreen({ propsOffers }: PlacesProps): JSX.Element {

  const activeSort = SortBy.Popular;
  const checkedCity = 'Amsterdam';

  const filteredOffers = propsOffers.filter((item) => (
    checkedCity === item.city?.name
  ));

  const checkedCityCoordinates = filteredOffers[0].city;

  const defaultCity = {
    location: {
      latitude: 52.23,
      longitude: 4.54,
      zoom: 10
    },
    name: 'Amsterdam'
  };

  const [selectedOffer, setSelectedOffer] = useState<OfferType | null>(null);

  function handleOfferSelected(offerId: number) {
    const currentOffer = filteredOffers.find((offer) => offer.id === offerId) || null;
    setSelectedOffer(currentOffer);
  }

  function handleOfferLeave() {
    setSelectedOffer(null);
  }

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
                  <a className={`locations__item-link tabs__item ${city === checkedCity ? 'tabs__item--active' : ''}`} href="#">
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
              <b className="places__found">{propsOffers.length} places to stay in Amsterdam</b>
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
                <ListOffers propsOffer={filteredOffers} onOfferHover={handleOfferSelected} onOfferLeave={handleOfferLeave} />
              </div>
            </section>
            <div className="cities__right-section">
              <Map city={checkedCityCoordinates || defaultCity} offers={filteredOffers} selectedOffer={selectedOffer} blockMap={'cities'} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
