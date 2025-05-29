import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../const';

describe('PrivateRoute Component', () => {
  it('should render children when authorization status matches required status', () => {
    render(
      <MemoryRouter>
        <PrivateRoute
          authorizationStatus={AuthorizationStatus.Auth}
          requiredAuthorizationStatus={AuthorizationStatus.Auth}
        >
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to login when authorization status does not match', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NotAuth}
                requiredAuthorizationStatus={AuthorizationStatus.Auth}
              >
                <div>Protected Content</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
