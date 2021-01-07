import React from 'react';
import GoogleMapReact from 'google-map-react';

import GoogleMapMarker from '../GoogleMapMarker/GoogleMapMarker';

import styles from './GoogleMap.module.scss';

interface IProps {
  place: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
    id: string;
  };
}

export default function GoogleMap({ place }: IProps): JSX.Element {
  const center = {
    lat: place.coordinates.latitude,
    lng: place.coordinates.longitude,
  };

  const zoom = 14;

  return (
    <div className={styles['google-map-container']}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_CLIENT_SECRET }}
        center={center}
        zoom={zoom}
        options={{ gestureHandling: 'greedy' }}
      >
        <GoogleMapMarker {...center} id={place.id} />
      </GoogleMapReact>
    </div>
  );
}
