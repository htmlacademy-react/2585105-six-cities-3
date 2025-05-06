import { CITY_LOCATIONS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';


export default function ListCities() {

  const dispatch = useAppDispatch();
  const checkedCity = useAppSelector((state) => state.selectedCity);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITY_LOCATIONS.map((city) => (
          <li key={city} className="locations__item" data-city={city}>
            <a className={`locations__item-link tabs__item ${city === checkedCity ? 'tabs__item--active' : ''}`} href="#" onClick={() => dispatch(changeCity({ city }))}>
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
