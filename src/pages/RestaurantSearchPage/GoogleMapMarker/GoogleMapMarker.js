import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './GoogleMapMarker.scss';

GoogleMapMarker.propTypes = {
  id: PropTypes.number,
  mapId: PropTypes.number,
};

function mapStateToProps(state) {
  return { mapId: state.mapId.mapId };
}

const hoveredStyles = {
  color: '#667eea',
  transform: 'translateY(-7px)',
};

export function GoogleMapMarker({ id, mapId }) {
  return (
    <i
      className={'fas fa-map-marker'}
      style={mapId === id ? hoveredStyles : null}
    >
      <p>{id}</p>
    </i>
  );
}

export default connect(mapStateToProps)(GoogleMapMarker);
