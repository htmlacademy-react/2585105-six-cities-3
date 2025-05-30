import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from './login';
import '@testing-library/jest-dom';

vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(() => vi.fn()),
}));

describe('Component: Login', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <HelmetProvider>
          <Login />
        </HelmetProvider>
      </MemoryRouter>
    );


    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();


    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();


    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();


    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();


    expect(screen.getByText('Amsterdam')).toBeInTheDocument();

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
