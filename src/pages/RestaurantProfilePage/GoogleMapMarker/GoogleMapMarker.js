import React from 'react';
import PropTypes from 'prop-types';

import { RestaurantProfileContext } from '../_Context/RestaurantProfileContext';

import './GoogleMapMarker.scss';
import { useContext } from 'react';

GoogleMapMarker.propTypes = {
  id: PropTypes.string,
};

export default function GoogleMapMarker() {
  const {
    state: { place },
  } = useContext(RestaurantProfileContext);

  return <i className='fas fa-map-marker-alt' id={place.id}></i>;
}
