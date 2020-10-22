import React from 'react';
import { useLocation } from 'react-router-dom';

import RestaurantLoaderBubbles from '../../../components/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantProfileLoader.module.scss';

export default function RestaurantProfileLoader() {
  const { state } = useLocation();

  return (
    <div className={styles['restaurant-prof-loader']}>
      <h3>Finding you more on {state.place.toUpperCase()}</h3>
      <RestaurantLoaderBubbles />
    </div>
  );
}
