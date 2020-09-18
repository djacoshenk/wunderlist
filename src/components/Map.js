import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import Marker from './Marker';

Map.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  hoverID: PropTypes.string,
  mapKey: PropTypes.number,
  hover: PropTypes.func,
};

export default function Map({ places, hoverID, mapKey, hover }) {
  const defaultCenter = {
    lat: 34.0407,
    lng: -118.2468,
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
    <div className='map-container'>
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
            <Marker
              lat={place.coordinates.latitude}
              lng={place.coordinates.longitude}
              key={place.id}
              id={place.id}
              text={index + 1}
              hoverID={hoverID}
              hover={hover}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
