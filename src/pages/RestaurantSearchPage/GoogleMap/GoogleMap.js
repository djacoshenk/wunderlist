import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import block from 'bem-cn';

import { RestaurantSearchContext } from '../_Context/RestaurantSearchContext';
import GoogleMapMarker from '../GoogleMapMarker/GoogleMapMarker';

import './GoogleMap.scss';

const b = block('RestaurantSearchPage');

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const defaultZoom = 13;

export default function GoogleMap() {
  const { state } = useContext(RestaurantSearchContext);

  function getMapBounds(maps) {
    const bounds = new maps.LatLngBounds();

    state.places.forEach((place) => {
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
        key={state.mapKey}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_CLIENT_SECRET }}
        center={defaultCenter}
        zoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleMapBounds(map, maps)}
        options={{ gestureHandling: 'greedy' }}
      >
        {state.places.map((place, index) => {
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
