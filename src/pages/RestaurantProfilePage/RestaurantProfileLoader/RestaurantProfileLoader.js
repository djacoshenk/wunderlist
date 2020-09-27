import React, { Fragment } from 'react';
import { block } from 'bem-cn';

import './RestaurantProfileLoader.scss';

const b = block('RestaurantProfilePage');

export default function RestaurantProfileLoader() {
  return (
    <Fragment>
      <div className={b('restaurant-prof-loader')}>
        <div className={b('bubble')}></div>
        <div className={b('bubble')}></div>
        <div className={b('bubble')}></div>
      </div>
    </Fragment>
  );
}
