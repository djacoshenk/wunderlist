import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantProfileLoader.module.scss';

RestaurantProfileLoader.propTypes = {
  name: PropTypes.string,
};

export default function RestaurantProfileLoader({ name }) {
  const location = useLocation();

  let headerText;

  if (location.state) {
    headerText = (
      <h3>Finding you more on {location.state.place.toUpperCase()}</h3>
    );
  } else if (name) {
    headerText = <h3>Finding you more on {name.toUpperCase()}</h3>;
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
