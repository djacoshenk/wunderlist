import React from 'react';
import PropTypes from 'prop-types';

Marker.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
};

export default function Marker({ text, id }) {
  return (
    <i className='fas fa-map-marker' id={id}>
      <p>{text}</p>
    </i>
  );
}
