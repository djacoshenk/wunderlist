import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

const defaultCenter = {
  lat: 34.0407,
  lng: -118.2468,
};

const defaultZoom = 11;

export default function Map({ places }) {
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);

  return (
    <div style={{ height: '84vh', width: '45%' }} className='map-container'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_CLIENT_SECRET }}
        defaultCenter={center}
        defaultZoom={zoom}
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
