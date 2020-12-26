import React from 'react';
import PropTypes from 'prop-types';

import './GoogleMapMarker.scss';

GoogleMapMarker.propTypes = {
  id: PropTypes.string,
};

export default function GoogleMapMarker({ id }) {
  return <i className={'fas fa-map-marker-alt'} id={id}></i>;
}
