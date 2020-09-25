import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import GoogleMapMarker from '../GoogleMapMarker/GoogleMapMarker';

import './GoogleMap.scss';

GoogleMap.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.string,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
};

const b = block('RestaurantProfilePage');

export default function GoogleMap({ place }) {
  const center = {
    lat: place.coordinates.latitude,
    lng: place.coordinates.longitude,
  };

  const zoom = 14;

  return (
    <div className={b('google-map-container')}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_CLIENT_SECRET }}
        center={center}
        zoom={zoom}
        options={{ gestureHandling: 'greedy' }}
      >
        <GoogleMapMarker
          lat={place.coordinates.latitude}
          lng={place.coordinates.longitude}
          id={place.id}
        />
      </GoogleMapReact>
    </div>
  );
}
