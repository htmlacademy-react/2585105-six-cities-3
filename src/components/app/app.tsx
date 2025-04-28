import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites';
import Login from '../../pages/login-page/login';
import MainScreen from '../../pages/main-page/main';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Offer from '../../pages/offer-page/offer';
import NotFoundPage from '../../pages/not-found-pages/not-found-pages';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { OfferType } from '../../types/offer-type';
import { CommentType } from '../../types/review-type';
import { useState } from 'react';


const authStatus = AuthorizationStatus.Auth;

type AppPlacesCards = {
  offers: OfferType[];
  review: CommentType[];
}

const defaultCity = {
  location: {
    latitude: 52.23,
    longitude: 4.54,
    zoom: 10
  },
  name: 'Amsterdam'
};


function App({ offers, review }: AppPlacesCards): JSX.Element {
  const checkedCity = 'Amsterdam';

  const filteredOffers = offers.filter((item) => (
    checkedCity === item.city?.name
  ));

  const [selectedOffer, setSelectedOffer] = useState<OfferType | null>(null);

  function handleOfferSelected(offerId: number) {
    const currentOffer = offers.find((offer) => offer.id === offerId) || null;
    setSelectedOffer(currentOffer);
  }

  function handleOfferLeave() {
    setSelectedOffer(null);
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainScreen
                propsOffers={filteredOffers}
                defaultCity={defaultCity}
                checkedCity={checkedCity}
                onOfferHover={handleOfferSelected}
                onOfferLeave={handleOfferLeave}
                selectedOffer={selectedOffer}
              />
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authStatus}>
                <FavoritesPage propsOffers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={AppRoute.Offer}
            element={<Offer propsOffers={filteredOffers} propsReview={review} defaultCity={defaultCity} onOfferHover={handleOfferSelected} onOfferLeave={handleOfferLeave} />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>

      </BrowserRouter>
    </HelmetProvider>


  );
}

export default App;
