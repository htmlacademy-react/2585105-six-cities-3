import { CITY_LOCATIONS } from '../../const';

type ListCity = {
  checkedCity: string;
}

export default function ListCities({ checkedCity }: ListCity) {
  return (
    CITY_LOCATIONS.map((city) => (
      <li key={city} className="locations__item" data-city={city}>
        <a className={`locations__item-link tabs__item ${city === checkedCity ? 'tabs__item--active' : ''}`} href="#">
          <span>{city}</span>
        </a>
      </li>
    ))
  );
}
