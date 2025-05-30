import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';

function NotFoundPage() {
  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. 404</title>
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
            <div>
              <h1 className="login__title">404.Page not found</h1>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
