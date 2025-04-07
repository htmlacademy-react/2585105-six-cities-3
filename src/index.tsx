import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const CARDS_COUNT = 4;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCardsCount={CARDS_COUNT} />
  </React.StrictMode>
);
