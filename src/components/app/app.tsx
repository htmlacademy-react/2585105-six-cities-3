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


const authStatus = AuthorizationStatus.Auth;

type AppPlacesCards = {
  offers: OfferType[];
  review: CommentType[];
}


function App({ offers, review }: AppPlacesCards): JSX.Element {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen propsOffers={offers} />}
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
            element={<Offer propsOffers={offers} propsReview={review} />}
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
