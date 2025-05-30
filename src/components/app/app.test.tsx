import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute } from '../../const';
import App from './app';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: {
      email: 'test@test.com',
      token: 'token',
      name: 'Test User',
      avatarUrl: 'avatar.jpg',
      isPro: false
    }
  },
  DATA: {
    offers: [{
      id: '1',
      title: 'Test Offer',
      type: 'apartment',
      price: 100,
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13
        }
      },
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'image.jpg',
      description: 'Test description',
      bedrooms: 2,
      goods: ['Wi-Fi'],
      host: {
        name: 'Host',
        avatarUrl: 'avatar.jpg',
        isPro: false,
        id: 1
      },
      maxAdults: 2,
      images: ['image.jpg']
    }],
    selectedCity: 'Paris',
    loadingStatus: false,
    activeSort: 'Popular'
  }
});

describe('App Routing', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.push('/');
  });

  it('should render main page when navigating to "/"', () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  it('should render login page when navigating to "/login"', () => {
    history.push(AppRoute.Login);
    render(
      <Provider store={mockStore({
        USER: { authorizationStatus: AuthorizationStatus.NotAuth, userInfo: null },
        DATA: { offers: [], selectedCity: 'Paris', loadingStatus: false, activeSort: 'Popular' }
      })}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render favorites page when navigating to "/favorites" and user is authorized', () => {
    history.push(AppRoute.Favorites);
    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should redirect to login when unauthorized user tries to access /favorites', () => {
    history.push(AppRoute.Favorites);
    render(
      <Provider store={mockStore({
        USER: { authorizationStatus: AuthorizationStatus.NotAuth, userInfo: null },
        DATA: { offers: [], selectedCity: 'Paris', loadingStatus: false, activeSort: 'Popular' }
      })}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render offer page when navigating to "/offer/:id"', () => {
    history.push('/offer/1');
    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  });

  it('should render 404 page when navigating to non-existent route', () => {
    history.push('/non-existent-route');
    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
