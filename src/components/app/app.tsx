import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites';
import Login from '../../pages/login-page/login';
import MainScreen from '../../pages/main-page/main';
import { Route, Routes } from 'react-router-dom';
import Offer from '../../pages/offer-page/offer';
import NotFoundPage from '../../pages/not-found-pages/not-found-pages';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../store/hooks';
import Loader from '../loader/loader';
import HistoryRoute from '../history-route/history-route';
import { browserHistory } from '../../browser-history';
import { store } from '../../store';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';

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
  const offersAll = useAppSelector((state) => state.offers);
  const checkedCityName = useAppSelector((state) => state.selectedCity);
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const isDataLoading = useAppSelector((state) => state.loadingStatus);

  const filteredOffers = offersAll.filter((item) => (
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
              <MainScreen
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
            element={<Login />}
          />
          <Route
            path={AppRoute.Offer}
            element={<Offer defaultCity={defaultCity} />}
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
