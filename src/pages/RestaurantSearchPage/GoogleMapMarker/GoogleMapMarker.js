import React from 'react';
import PropTypes from 'prop-types';

import './GoogleMapMarker.scss';

GoogleMapMarker.propTypes = {
  text: PropTypes.number,
  id: PropTypes.string,
  hoverID: PropTypes.string,
  handleHover: PropTypes.func,
};

export default function GoogleMapMarker({ text, id, hoverID, handleHover }) {
  const hoveredMarkerStyles = {
    color: '#333',
    transform: 'translate(0, -5px)',
  };

  const hoveredTextStyles = {
    color: '#38b2ac',
  };

  function hover(e) {
    const { id } = e.target;

    handleHover(e, id);
  }

  return (
    <i
      className='fas fa-map-marker'
      id={id}
      style={hoverID === id ? hoveredMarkerStyles : null}
      onMouseEnter={hover}
      onMouseLeave={hover}
    >
      <p style={hoverID === id ? hoveredTextStyles : null}>{text}</p>
    </i>
  );
}
