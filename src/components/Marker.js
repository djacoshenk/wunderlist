import React from 'react';
import PropTypes from 'prop-types';

Marker.propTypes = {
  text: PropTypes.number,
  id: PropTypes.string,
  hoverID: PropTypes.string,
  hover: PropTypes.func,
};

export default function Marker({ text, id, hoverID, hover }) {
  const hoveredMarkerStyles = {
    color: '#333',
    transform: 'translate(0, -5px)',
  };

  const hoveredTextStyles = {
    color: '#38b2ac',
  };

  function handleHover(e) {
    const { id } = e.target;

    hover(e, id);
  }

  return (
    <i
      className='fas fa-map-marker'
      id={id}
      style={hoverID === id ? hoveredMarkerStyles : null}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <p style={hoverID === id ? hoveredTextStyles : null}>{text}</p>
    </i>
  );
}
