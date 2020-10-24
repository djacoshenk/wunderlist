import React from 'react';
import { useLocation } from 'react-router-dom';

import RestaurantLoaderBubbles from '../../../shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantProfileLoader.module.scss';

function RestaurantProfileLoader() {
  const { state } = useLocation();

  return (
    <div className={styles['restaurant-prof-loader']}>
      <h3>Finding you more on {state.place.toUpperCase()}</h3>
      <RestaurantLoaderBubbles />
    </div>
  );
}

export default React.memo(RestaurantProfileLoader);
