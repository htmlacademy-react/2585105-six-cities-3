import { useState } from 'react';
import { OfferType } from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';

export type ListCardsComponents = {
  propsOffer: OfferType[];
  onOfferHover: (id: number) => void;
  onOfferLeave: () => void;

}

export default function ListOffers({ propsOffer, onOfferHover, onOfferLeave }: ListCardsComponents) {

  const [offerId, setHoverOfferId] = useState<number | null>(null);


  function handleCardHover(id: number | null) {
    setHoverOfferId(id);
    onOfferHover(id);
  }

  function handleCardMouseLeave() {
    setHoverOfferId(offerId);
    onOfferLeave();
  }

  return (
    <>
      {propsOffer.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={{ ...offer }}
          onCardHover={() => handleCardHover(offer.id)}
          onOfferMouseLeave={handleCardMouseLeave}
        />))}
    </>

  );
}
