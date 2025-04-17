import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { OfferType } from '../../types/offer-type';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import FavoriteComponent from '../../components/favorite-offer/favorite-offer';

type FavoritesOffers = {
  propsOffers: OfferType[];
}

function FavoritesPage({ propsOffers }: FavoritesOffers): JSX.Element {

  const [{ id }] = propsOffers;
  const pathCard = `/offer/${id}`;

  const citiesArr = useMemo(() => {
    const favoriteCities = new Set<string>();

    const favoriteOffers = propsOffers.filter((item) => item.isFavorite);

    favoriteOffers.forEach((item: OfferType) => item.city ? favoriteCities.add(item.city.name) : '');

    return {
      favoriteCitiesArr: Array.from(favoriteCities),
      favoriteOffers,
    };
  }, [propsOffers]);

  return (
    <div className= "page" >
    <Helmet>
    <title>6 cities.Favorites </title>
      </Helmet>
      < Header />
      <main className="page__main page__main--favorites" >
        <div className="page__favorites-container container" >
          <section className="favorites" >
            <h1 className="favorites__title" > Saved listing </h1>
              < ul className = "favorites__list" >
              {
                citiesArr.favoriteCitiesArr.map((city: string) => (
                  <li className= "favorites__locations-items" key = { city } >
                  <div className="favorites__locations locations locations--current" >
                <div className="locations__item" >
                <Link className="locations__item-link" to = { pathCard } >
                <span>{ city } </span>
                </Link>
                </div>
                </div>
                < div className = "favorites__places" >
                {
                  citiesArr.favoriteOffers.filter((item) => item.city?.name === city)
                    .map((item) => <FavoriteComponent favOffer={ item } key = { item.id } />)
                }
                </div>
                </li>
                ))
              }
                </>
                </section>
                </div>
                </main>
                < footer className = "footer container" >
                  <a className="footer__logo-link" href = "main.html" >
                    <img
            className="footer__logo"
  src = "img/logo.svg"
  alt = "6 cities logo"
  width = { 64}
  height = { 33}
    />
    </a>
    </footer>
    </div>
  );
}

export default FavoritesPage;
