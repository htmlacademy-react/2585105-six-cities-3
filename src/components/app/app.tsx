import MainScreen from '../../pages/main-page/main';

type AppPlacesCards = {
  placesCardsCount: number;
}


function App({ placesCardsCount }: AppPlacesCards): JSX.Element {
  return (
    <MainScreen placesCount={placesCardsCount} />
  );
}

export default App;
