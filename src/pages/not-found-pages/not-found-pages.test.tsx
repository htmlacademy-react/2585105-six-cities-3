import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './not-found-pages';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user-data';
import { HelmetProvider } from 'react-helmet-async';

const mockStore = configureMockStore();

describe('NotFoundPage', () => {
  const mockUserData: UserData = {
    email: 'test@test.com',
    token: 'token',
    name: 'Test User',
    avatarUrl: 'avatar.jpg',
    isPro: false
  };

  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUserData
      }
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <MemoryRouter>
            <NotFoundPage />
          </MemoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Return to main page')).toBeInTheDocument();
  });

  it('should render link to main page', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUserData
      }
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <MemoryRouter>
            <NotFoundPage />
          </MemoryRouter>
        </HelmetProvider>
      </Provider>
    );

    const link = screen.getByText('Return to main page');
    expect(link).toHaveAttribute('href', '/');
  });
});
