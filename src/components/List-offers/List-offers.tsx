import { OfferType } from '../../types/offer-type';
import PlaceCard from '../place-card/place-card';

export type ListCardsComponents = {
  propsOffer: OfferType[];
}

export default function ListOffers({ propsOffer }: ListCardsComponents) {

  return (
    <>
      {propsOffer.map((offer) => <PlaceCard key={offer.id} offer={{ ...offer }} />)}
    </>

  );
}
