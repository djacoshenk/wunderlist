import React from 'react';

export default function Marker({ text }) {
  return (
    <i className='fas fa-map-marker'>
      <p>{text}</p>
    </i>
  );
}
