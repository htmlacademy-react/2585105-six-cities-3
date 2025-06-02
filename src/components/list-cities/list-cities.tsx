import { Link } from 'react-router-dom';
import { AppRoute, CITY_LOCATIONS } from '../../const';
import { setCityName } from '../../store/data-process/data-process';
import { useAppDispatch } from '../../store/hooks';


type ListCity = {
  checkedCityName: string;
}

export default function ListCities({ checkedCityName }: ListCity) {

  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {CITY_LOCATIONS.map((city) => (
        <li key={city} className="locations__item" data-city={city}>
          <Link to={AppRoute.Main} className={`locations__item-link tabs__item ${city === checkedCityName ? 'tabs__item--active' : ''}`}
            onClick={(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              evt.preventDefault();
              dispatch(setCityName(city));
            }}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
