import React from 'react';

import RestaurantLoaderBubbles from '../../../components/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantProfileLoader.module.scss';

export default function RestaurantProfileLoader() {
  return (
    <div className={styles['restaurant-prof-loader']}>
      <RestaurantLoaderBubbles />
    </div>
  );
}
