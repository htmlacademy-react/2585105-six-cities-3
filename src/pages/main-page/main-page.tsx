import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { City, OfferType } from '../../types/offer-type';
import ListOffers from '../../components/List-offers/List-offers';
import Map from '../../components/map/map';
import ListCities from '../../components/list-cities/list-cities';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Sorting from '../../components/sorting/sorting';
import { changeSorting } from '../../store/data-process/data-process';


type PlacesProps = {
  defaultCity: City;
  offers: OfferType[];
}

function MainPage({ defaultCity, offers }: PlacesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const checkedCityName = useAppSelector((state) => state.DATA.selectedCity);
  const city = offers.find((item) => item.city?.name === checkedCityName)?.city;
  const [selectedOffer, setSelectedOffer] = useState<OfferType | null>(null);

  function handleOfferSelected(offerId: string) {
    const currentOffer = offers.find((offer) => offer.id === offerId) || null;
    setSelectedOffer(currentOffer);
  }

  function handleOfferLeave() {
    setSelectedOffer(null);
  }

  function handleToogleSort(sort: string) {
    dispatch(changeSorting(sort));
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--index ${offers.length !== 0 ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container"><ListCities checkedCityName={checkedCityName} /></section>

        </div>
        <div className="cities">
          <div className={`cities__places-container ${offers.length !== 0 ? '' : 'cities__places-container--empty'} container`}>
            {offers.length !== 0 ? (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {checkedCityName}</b>
                <Sorting onChange={handleToogleSort} />
                <div className="cities__places-list places__list tabs__content">
                  <ListOffers propsOffer={offers} onOfferHover={handleOfferSelected} onOfferLeave={handleOfferLeave} />
                </div>
              </section>
            ) : (
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
            )}

            <div className="cities__right-section">
              {offers.length !== 0 ? <Map city={city || defaultCity} offers={offers} selectedOffer={selectedOffer} blockMap={'cities'} /> : ''}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
