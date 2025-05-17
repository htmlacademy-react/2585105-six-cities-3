import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function AuthUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const favoriteCounts = useAppSelector((state) => state.countFavoritesOffer);

  const logOutHandle = () => {
    dispatch(logoutAction());
  };

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <a
          className="header__nav-link header__nav-link--profile"
          href="#"
        >
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">
            {user?.email}
          </span>
          <span className="header__favorite-count">{favoriteCounts}</span>
        </a>
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
