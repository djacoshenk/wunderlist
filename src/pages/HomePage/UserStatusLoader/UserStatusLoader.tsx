import React from 'react';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import { RootState } from 'store/index';

import styles from './UserStatusLoader.module.scss';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function UserLogoutLoader() {
  const { loadingMessage } = useTypedSelector((state) => state.loadingStatus);

  return (
    <div className={styles['user-status-loader']}>
      <h3 className={styles['user-status-loader-message']}>{loadingMessage}</h3>
      <div className={styles['user-status-bubble-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    </div>
  );
}
