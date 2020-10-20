import React from 'react';

import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantCardList from '../RestaurantCardList/RestaurantCardList';

import styles from './MainContent.module.scss';

export default function MainContent() {
  return (
    <div className={styles['main-container']}>
      <GoogleMap />
      <RestaurantCardList />
    </div>
  );
}
