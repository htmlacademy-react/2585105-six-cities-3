import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { selectOffers } from '../../store/data-process/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AppRoute } from '../../const';

export default function AuthUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.USER.userInfo);
  const favoriteCounts = useAppSelector(selectOffers).filter((item) => item.isFavorite).length;

  const logOutHandle = () => {
    dispatch(logoutAction());
  };

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.Favorites}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">
            {user?.email}
          </span>
          <span className="header__favorite-count">{favoriteCounts}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="#"
          onClick={(evt) => {
            evt.preventDefault();
            logOutHandle();
          }}
        >
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </ul>
  );
}
