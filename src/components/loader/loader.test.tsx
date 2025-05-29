import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Loader Component', () => {
  it('should render correctly', () => {
    render(<Loader />);

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(document.querySelector('.block')).toBeInTheDocument();
  });
});
