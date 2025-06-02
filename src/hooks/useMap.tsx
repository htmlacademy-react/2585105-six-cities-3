import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/offer-type';

type useMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  city: City;
}

export default function useMap({ mapRef, city }: useMapProps) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: 10
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <Link to="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors &copy; <Link to="https://carto.com/attributions">CARTO</Link>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}
