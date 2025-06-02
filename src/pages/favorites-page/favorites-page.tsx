import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { OfferType } from '../../types/offer-type';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import FavoriteOffer from '../../components/favorite-offer/favorite-offer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isSelectUserAuth } from '../../store/user-process/selectors';
import { postFavoriteStatus } from '../../store/api-actions';
import { setCityName, setFavoriteStatus } from '../../store/data-process/data-process';
import { AppRoute } from '../../const';

type FavoritesOffers = {
  propsOffers: OfferType[];
}

function FavoritesPage({ propsOffers }: FavoritesOffers): JSX.Element {
  const isAuthUser = useAppSelector(isSelectUserAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const citiesArr = useMemo(() => {
    const favoriteCities = new Set<string>();

    const favoriteOffers = propsOffers.filter((item) => item.isFavorite);

    favoriteOffers.forEach((item: OfferType) => item.city ? favoriteCities.add(item.city.name) : '');

    return {
      favoriteCitiesArr: Array.from(favoriteCities),
      favoriteOffers,
    };
  }, [propsOffers]);

  const handleFavoriteClick = (element: OfferType) => {
    if (isAuthUser) {
      postFavoriteStatus(element.id, !element.isFavorite).then((item: OfferType) => {
        dispatch(setFavoriteStatus({ offerId: element.id, status: item.isFavorite }));
      });
    } else {
      navigate(AppRoute.Login);
    }
  };


  const handleCityClick = (item:string) => {
    dispatch(setCityName(item));
  };

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {citiesArr.favoriteCitiesArr.map((city: string) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link to={AppRoute.Main} className="locations__item-link" onClick={() => handleCityClick(city)}>
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {citiesArr.favoriteOffers.map((item) => item.city?.name === city ?
                      <FavoriteOffer handleFavoriteClick={handleFavoriteClick} favOffer={item} key={item.id} /> : null)}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoute.Main} className="footer__logo-link">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
