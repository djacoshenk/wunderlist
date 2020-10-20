import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import GoogleMapMarker from '../GoogleMapMarker/GoogleMapMarker';
import { RestaurantProfileContext } from '../_Context/RestaurantProfileContext';

import styles from './GoogleMap.module.scss';

GoogleMap.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.string,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
};

export default function GoogleMap() {
  const {
    state: { place },
  } = useContext(RestaurantProfileContext);

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
        <GoogleMapMarker
          lat={place.coordinates.latitude}
          lng={place.coordinates.longitude}
        />
      </GoogleMapReact>
    </div>
  );
}
