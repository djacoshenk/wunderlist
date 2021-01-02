import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import './GoogleMapMarker.scss';

GoogleMapMarker.propTypes = {
  id: PropTypes.number,
};

const mapIdIconStyles = {
  color: '#333',
  transform: 'translateY(-7px)',
};

const mapIdTextStyles = {
  color: '#38b2ac',
};

export default function GoogleMapMarker({ id }) {
  const { mapId } = useSelector((state) => state.mapId);

  return (
    <i
      className={'fas fa-map-marker'}
      style={mapId === id ? mapIdIconStyles : null}
    >
      <p style={mapId === id ? mapIdTextStyles : null}>{id}</p>
    </i>
  );
}
