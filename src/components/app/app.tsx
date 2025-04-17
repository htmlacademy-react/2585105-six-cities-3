import { AppRoute, AuthorizationStatus } from '../../const';
import Favorites from '../../pages/favorites-page/favorites';
import Login from '../../pages/login-page/login';
import MainScreen from '../../pages/main-page/main';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Offer from '../../pages/offer-page/offer';
import NotFoundPage from '../../pages/not-found-pages/not-found-pages';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { OfferType } from '../../types/offer-type';


const authStatus = AuthorizationStatus.Auth;

type AppPlacesCards = {
  placesCardsCount: number;
  offers: OfferType[];
}


function App({ placesCardsCount, offers }: AppPlacesCards): JSX.Element {
  const [...offersAll] = offers;
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen placesCount={placesCardsCount} propsOffers={offersAll} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authStatus}>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={AppRoute.Offer}
            element={<Offer />}
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
