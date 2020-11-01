import React, { useContext } from 'react';

import { RestaurantProfileContext } from '../_Context/RestaurantProfileContext';

import './GoogleMapMarker.scss';

function GoogleMapMarker() {
  const {
    state: { place },
  } = useContext(RestaurantProfileContext);

  return <i className={'fas fa-map-marker-alt'} id={place.id}></i>;
}

export default GoogleMapMarker;
