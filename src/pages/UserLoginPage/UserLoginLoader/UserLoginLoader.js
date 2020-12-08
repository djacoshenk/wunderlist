import React from 'react';

import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './UserLoginLoader.module.scss';

export default function UserLoginLoader() {
  return (
    <div className={styles['user-login-loader']}>
      <h3>Logging In...</h3>
      <div className={styles['user-login-bubble-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    </div>
  );
}
