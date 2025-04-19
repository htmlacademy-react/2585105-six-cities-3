import { useState } from 'react';
import { OfferType } from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';

export type ListCardsComponents = {
  propsOffer: OfferType[];
}

export default function ListOffers({ propsOffer }: ListCardsComponents) {

  const [, setHoverOfferId] = useState<OfferType['id'] | null>(null);

  function handleCardHover(offerId: OfferType['id'] | null) {
    setHoverOfferId(offerId);
  }

  return (
    <>
      {propsOffer.map((offer) => <PlaceCard key={offer.id} offer={{ ...offer }} onCardHover={handleCardHover} />)}
    </>

  );
}
