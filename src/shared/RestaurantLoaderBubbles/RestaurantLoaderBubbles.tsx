import React from 'react';

import styles from './RestaurantLoaderBubbles.module.scss';

export default function RestaurantLoaderBubbles(): JSX.Element {
  return (
    <div className={styles['restaurant-prof-bubble-loader']}>
      <div className={styles['bubble']}></div>
      <div className={styles['bubble']}></div>
      <div className={styles['bubble']}></div>
    </div>
  );
}
