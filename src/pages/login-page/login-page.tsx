import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { setCityName } from '../../store/data-process/data-process';
import { getRandomCity } from '../../utils';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmitAuth = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value
      });
    }
  };
  const randomCity = getRandomCity();
  const handleCityClick = (item: string) => {
    dispatch(setCityName(item));
  };
  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmitAuth}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  ref={loginRef}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Main} className="locations__item-link" onClick={() => handleCityClick(randomCity)}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
