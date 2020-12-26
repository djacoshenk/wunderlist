import React from 'react';
import PropTypes from 'prop-types';

import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantCardList from '../RestaurantCardList/RestaurantCardList';

import styles from './MainContent.module.scss';

MainContent.propTypes = {
  places: PropTypes.array,
  mapKey: PropTypes.number,
  fetchMorePlaces: PropTypes.func,
};

export default function MainContent({ places, mapKey, fetchMorePlaces }) {
  return (
    <div className={styles['main-content-container']}>
      <GoogleMap places={places} mapKey={mapKey} />
      <RestaurantCardList places={places} fetchMorePlaces={fetchMorePlaces} />
    </div>
  );
}
