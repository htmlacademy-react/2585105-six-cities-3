import { CITY_LOCATIONS } from '../../const';
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
          <a className={`locations__item-link tabs__item ${city === checkedCityName ? 'tabs__item--active' : ''}`} href="#" onClick={() => dispatch(setCityName(city))}>
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
