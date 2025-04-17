import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import offers from './mocks/offers';

const CARDS_COUNT = offers.length;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      placesCardsCount={CARDS_COUNT}
      offers={offers}
    />
  </React.StrictMode>
);
