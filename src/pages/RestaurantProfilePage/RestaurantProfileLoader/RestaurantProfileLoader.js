import React, { Fragment } from 'react';
import { block } from 'bem-cn';

import RestaurantProfileLoaderBubbles from '../RestaurantProfileLoaderBubbles/RestaurantProfileLoaderBubbles';

import './RestaurantProfileLoader.scss';

const b = block('RestaurantProfilePage');

export default function RestaurantProfileLoader() {
  return (
    <Fragment>
      <div className={b('restaurant-prof-loader')}>
        <div className={b('restaurant-prof-bubble-loader')}>
          <RestaurantProfileLoaderBubbles />
        </div>
      </div>
    </Fragment>
  );
}
