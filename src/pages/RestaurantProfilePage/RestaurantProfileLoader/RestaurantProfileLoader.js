import React, { Fragment } from 'react';

import './RestaurantProfileLoader.scss';

export default function SearchRestaurantLoader() {
  return (
    <Fragment>
      <div className='bubble-loader'>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
      </div>
    </Fragment>
  );
}
