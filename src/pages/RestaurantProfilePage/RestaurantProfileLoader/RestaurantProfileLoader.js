import React, { useContext } from 'react';

import { RestaurantProfileContext } from '../_Context/RestaurantProfileContext';
import RestaurantLoaderBubbles from '../../../shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantProfileLoader.module.scss';

function RestaurantProfileLoader() {
  const { state } = useContext(RestaurantProfileContext);

  return (
    <div className={styles['restaurant-prof-loader']}>
      {state.place.name && (
        <h3>Finding you more on {state.place.name.toUpperCase()}</h3>
      )}
      <RestaurantLoaderBubbles />
    </div>
  );
}

export default React.memo(RestaurantProfileLoader);
