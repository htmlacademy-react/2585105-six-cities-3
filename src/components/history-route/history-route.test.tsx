import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from './history-route';

describe('HistoryRoute Component', () => {
  it('should render children with provided history', () => {
    const history = createMemoryHistory();
    history.push('/test');

    render(
      <HistoryRoute history={history}>
        <div>Test Content</div>
      </HistoryRoute>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/test');
  });

  it('should update location when history changes', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRoute history={history}>
        <div>Test Content</div>
      </HistoryRoute>
    );

    history.push('/new-location');
    expect(history.location.pathname).toBe('/new-location');
  });
});
