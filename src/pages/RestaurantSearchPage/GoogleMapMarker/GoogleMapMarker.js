import React from 'react';
import PropTypes from 'prop-types';

import './GoogleMapMarker.scss';

GoogleMapMarker.propTypes = {
  text: PropTypes.number,
};

export default function GoogleMapMarker({ text }) {
  return (
    <i className={'fas fa-map-marker'}>
      <p>{text}</p>
    </i>
  );
}
