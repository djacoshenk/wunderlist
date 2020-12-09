import React from 'react';

import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './UserLogoutLoader.module.scss';

export default function UserLogoutLoader() {
  return (
    <div className={styles['user-logout-loader']}>
      <h3>Logging Out...</h3>
      <div className={styles['user-logout-bubble-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    </div>
  );
}
