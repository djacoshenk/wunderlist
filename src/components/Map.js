import React from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

export default function Map({ places }) {
  const center = {
    lat: 34.0407,
    lng: -118.2468,
  };

  const zoom = 13;

  function getMapBounds(map, maps) {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(
        new maps.LatLng(place.coordinates.latitude, place.coordinates.longitude)
      );
    });

    return bounds;
  }

  function handleApiLoaded(map, maps, places) {
    const bounds = getMapBounds(map, maps, places);

    map.fitBounds(bounds);
  }

  return (
    <div className='map-container'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_CLIENT_SECRET }}
        center={center}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {places.map((place, index) => {
          return (
            <Marker
              lat={place.coordinates.latitude}
              lng={place.coordinates.longitude}
              key={place.id}
              text={index + 1}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
