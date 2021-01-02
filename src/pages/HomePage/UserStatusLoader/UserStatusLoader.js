import React from 'react';
import { useSelector } from 'react-redux';

import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './UserStatusLoader.module.scss';

export default function UserLogoutLoader() {
  const { loadingMessage } = useSelector((state) => state.loadingStatus);

  return (
    <div className={styles['user-status-loader']}>
      <h3>{loadingMessage}</h3>
      <div className={styles['user-status-bubble-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    </div>
  );
}
