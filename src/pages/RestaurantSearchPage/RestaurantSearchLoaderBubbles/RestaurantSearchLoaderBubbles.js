import React, { Fragment } from 'react';
import block from 'bem-cn';

import './RestaurantSearchLoaderBubbles.scss';

const b = block('RestaurantSearchPage');

export default function SearchRestaurantLoaderBubbles() {
  return (
    <Fragment>
      <div className={b('bubble')}></div>
      <div className={b('bubble')}></div>
      <div className={b('bubble')}></div>
    </Fragment>
  );
}
