import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: string;
  children: JSX.Element;
  requiredAuthorizationStatus: string;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children, requiredAuthorizationStatus } = props;

  return (
    authorizationStatus === requiredAuthorizationStatus
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
