import React from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

export default function Map({ places, center, zoom }) {
  return (
    <div className='map-container'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_CLIENT_SECRET }}
        center={center}
        zoom={zoom}
      >
        {places.map((place) => {
          return (
            <Marker
              lat={place.coordinates.latitude}
              lng={place.coordinates.longitude}
              key={place.id}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
