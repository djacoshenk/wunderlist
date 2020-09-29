import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import GoogleMapMarker from '../GoogleMapMarker/GoogleMapMarker';

import './GoogleMap.scss';

GoogleMap.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  mapKey: PropTypes.number,
};

const b = block('RestaurantSearchPage');

export default function GoogleMap({ places, mapKey }) {
  const defaultCenter = {
    lat: 0,
    lng: 0,
  };

  const defaultZoom = 13;

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
    <div className={b('google-map-container')}>
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
          return (
            <GoogleMapMarker
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
