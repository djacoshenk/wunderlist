import React from 'react';
import GoogleMapReact from 'google-map-react';

import GoogleMapMarker from '../GoogleMapMarker/GoogleMapMarker';

import styles from './GoogleMap.module.scss';

interface Categories {
  title: string;
}

interface Place {
  id: string;
  alias: string;
  image_url: string;
  name: string;
  rating: number;
  review_count: number;
  price: string;
  categories: Categories[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  display_phone: string;
  location: {
    display_address: string[];
  };
}

interface IProps {
  places: Place[];
  mapKey: number;
}

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const defaultZoom = 13;

export default function GoogleMap({ places, mapKey }: IProps): JSX.Element {
  function getMapBounds(maps) {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(
        new maps.LatLng(place.coordinates.latitude, place.coordinates.longitude)
      );
    });

    return bounds;
  }

  function handleMapBounds(map, maps) {
    const bounds = getMapBounds(maps);

    map.fitBounds(bounds);
  }

  return (
    <div className={styles['google-map-container']}>
      <GoogleMapReact
        key={mapKey}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_CLIENT_SECRET }}
        center={defaultCenter}
        zoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleMapBounds(map, maps)}
        options={{ gestureHandling: 'greedy' }}
      >
        {places.map((place, index) => {
          const center = {
            lat: place.coordinates.latitude,
            lng: place.coordinates.longitude,
          };

          return (
            <GoogleMapMarker
              {...center}
              key={place.id}
              id={index + 1}
              place={place}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}