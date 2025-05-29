import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NoAuthUser from './no-auth-user';

describe('NoAuthUser Component', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <NoAuthUser />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/login');
  });
});
