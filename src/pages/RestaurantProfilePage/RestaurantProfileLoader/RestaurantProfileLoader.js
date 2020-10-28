import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { RestaurantProfileContext } from '../_Context/RestaurantProfileContext';
import RestaurantLoaderBubbles from '../../../shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantProfileLoader.module.scss';

function RestaurantProfileLoader() {
  const { state } = useLocation();
  const {
    state: { place },
  } = useContext(RestaurantProfileContext);

  // if we have the state from the location
  if (state) {
    return (
      <div className={styles['restaurant-prof-loader']}>
        {state.place && (
          <h3>Finding you more on {state.place.toUpperCase()}</h3>
        )}
        <RestaurantLoaderBubbles />
      </div>
    );
    // if we don't have the state from the location, use the context
  } else if (place) {
    return (
      <div className={styles['restaurant-prof-loader']}>
        {place.name && <h3>Finding you more on {place.name.toUpperCase()}</h3>}
        <RestaurantLoaderBubbles />
      </div>
    );
  } else {
    return (
      <div className={styles['restaurant-prof-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    );
  }
}

export default React.memo(RestaurantProfileLoader);
