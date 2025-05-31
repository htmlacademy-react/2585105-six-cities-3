import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import { Route, Routes } from 'react-router-dom';
import OfferPage from '../../pages/offer-page/offer-page';

import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../store/hooks';
import Loader from '../loader/loader';
import HistoryRoute from '../history-route/history-route';
import { browserHistory } from '../../browser-history';
import { store } from '../../store';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';
import { OfferType } from '../../types/offer-type';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const defaultCity = {
  location: {
    latitude: 52.23,
    longitude: 4.54,
    zoom: 10
  },
  name: 'Amsterdam'
};

function App() {
  const offersAll = useAppSelector((state) => state.DATA.offers);
  const checkedCityName = useAppSelector((state) => state.DATA.selectedCity);
  const authStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const isDataLoading = useAppSelector((state) => state.DATA.loadingStatus);

  const filteredOffers = offersAll.filter((item: OfferType) => (
    checkedCityName === item.city?.name
  ));

  if (isDataLoading) {
    return (
      <Loader />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRoute history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainPage
                defaultCity={defaultCity}
                offers={filteredOffers}
              />
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                requiredAuthorizationStatus={AuthorizationStatus.Auth}
                authorizationStatus={authStatus}
              >
                <FavoritesPage propsOffers={offersAll} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage defaultCity={defaultCity} />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>

      </HistoryRoute>
    </HelmetProvider>


  );
}

export default App;
