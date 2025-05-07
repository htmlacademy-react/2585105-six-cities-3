import { useState } from 'react';
import { OfferType } from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';
import { sortingByOption } from '../../utils';
import { useAppSelector } from '../../store/hooks';

export type ListCardsComponents = {
  propsOffer: OfferType[];
  onOfferHover: (id: number) => void;
  onOfferLeave: () => void;
}

export default function ListOffers({ propsOffer, onOfferHover, onOfferLeave }: ListCardsComponents) {

  const [offerId, setHoverOfferId] = useState<number | null>(null);
  const activeSort = useAppSelector((state) => state.activeSort);
  const sortOffers = sortingByOption(propsOffer, activeSort);

  function handleCardHover(id: number | null) {
    if (!id) {
      return;
    }
    setHoverOfferId(id);
    onOfferHover(id);
  }

  function handleCardMouseLeave() {
    setHoverOfferId(offerId);
    onOfferLeave();
  }

  return (
    <>
      {sortOffers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onCardHover={() => handleCardHover(offer.id)}
          onOfferMouseLeave={handleCardMouseLeave}
          block='cities'
        />))}
    </>);
}
