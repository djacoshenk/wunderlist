import React from 'react';

import styles from './RestaurantLoaderBubbles.module.scss';

function RestaurantLoaderBubbles() {
  return (
    <div className={styles['restaurant-prof-bubble-loader']}>
      <div className={styles['bubble']}></div>
      <div className={styles['bubble']}></div>
      <div className={styles['bubble']}></div>
    </div>
  );
}

export default React.memo(RestaurantLoaderBubbles);
