import React from 'react';
import PropTypes from 'prop-types';

Marker.propTypes = {
  text: PropTypes.number,
  id: PropTypes.string,
  hoverID: PropTypes.string,
  handleHover: PropTypes.func,
};

const hoveredMarkerStyles = {
  color: '#333',
  transform: 'translate(0, -5px)',
};

const hoveredTextStyles = {
  color: '#38b2ac',
};

export default function Marker({ text, id, hoverID, handleHover }) {
  return (
    <i
      className='fas fa-map-marker'
      id={id}
      style={hoverID === id ? hoveredMarkerStyles : null}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onTouchStart={handleHover}
      onTouchEnd={handleHover}
    >
      <p style={hoverID === id ? hoveredTextStyles : null}>{text}</p>
    </i>
  );
}
