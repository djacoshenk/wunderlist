import React from 'react';

import RestaurantLoaderBubbles from '../../../shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './UserRegistrationLoader.module.scss';

export default function UserRegistrationLoader() {
  return (
    <div className={styles['user-registration-loader']}>
      <h3>Registering New User...</h3>
      <div className={styles['user-registration-bubble-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    </div>
  );
}
