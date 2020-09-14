import React from 'react';

export default function Marker({ text, id }) {
  return (
    <i className='fas fa-map-marker' id={id}>
      <p>{text}</p>
    </i>
  );
}
