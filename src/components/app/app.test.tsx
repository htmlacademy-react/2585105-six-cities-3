import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';


const TestComponent = () => <div>Test Content</div>;

describe('Component: PrivateRoute', () => {

  it('should redirect to login when authorization fails', () => {
    const { queryByText, container } = render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute
                authorizationStatus="NO_AUTH"
                requiredAuthorizationStatus="AUTH"
              >
                <TestComponent />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );


    expect(queryByText('Test Content')).toBeNull();

    expect(container.innerHTML).toContain('Login Page');
  });
});
