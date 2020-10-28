import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { RestaurantProfileContext } from '../_Context/RestaurantProfileContext';
import RestaurantLoaderBubbles from '../../../shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantProfileLoader.module.scss';

function RestaurantProfileLoader() {
  const location = useLocation();
  const { state } = useContext(RestaurantProfileContext);

  let headerText;

  if (location.state) {
    headerText = (
      <h3>Finding you more on {location.state.place.toUpperCase()}</h3>
    );
  } else if (state.place.name) {
    headerText = <h3>Finding you more on {state.place.name.toUpperCase()}</h3>;
  } else {
    headerText = null;
  }

  return (
    <div className={styles['restaurant-prof-loader']}>
      {headerText}
      <RestaurantLoaderBubbles />
    </div>
  );
}

export default React.memo(RestaurantProfileLoader);
