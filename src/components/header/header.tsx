import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../store/hooks';
import AuthUser from '../auth-user/auth-user';
import Logo from '../logo/logo';
import NoAuthUser from '../no-auth-user/no-auth-user';

export default function Header() {
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {authStatus === AuthorizationStatus.Auth as string ? <AuthUser /> : <NoAuthUser />}
          </nav>
        </div>
      </div>
    </header>
  );
}
