import { useSelector, TypedUseSelectorHook } from 'react-redux';

import styles from 'pages/HomePage/UserStatusLoader/UserStatusLoader.module.scss';
import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';
import { RootState } from 'store/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function UserLogoutLoader() {
  const { loadingMessage } = useTypedSelector((state) => state.loadingStatus);

  return (
    <div className={styles['user-status-loader']}>
      {loadingMessage && (
        <h3 className={styles['user-status-loader-message']}>
          {loadingMessage}
        </h3>
      )}
      <div className={styles['user-status-bubble-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    </div>
  );
}
