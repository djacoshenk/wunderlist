import React from 'react';

import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantSearchLoader.module.scss';

export default function RestaurantSearchLoader(): JSX.Element {
  return (
    <div className={styles['main-content-bubble-loader']}>
      <RestaurantLoaderBubbles />
    </div>
  );
}
