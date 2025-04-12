import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link className="header__logo-link" to="/">
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        title="Перейти на главную страницу"
        width={81}
        height={41}
      />
    </Link>
  );
}
