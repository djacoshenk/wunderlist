import React from 'react';
import { useParams } from 'react-router-dom';

import RestaurantLoaderBubbles from '../../../components/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './RestaurantSearchLoader.module.scss';

export default function SearchRestaurantLoader() {
  const { term, location } = useParams();

  return (
    <div className={styles['main-content-loader']}>
      <h3>
        Finding you the best {term.toUpperCase()} in {location}
      </h3>
      <div className={styles['main-content-bubble-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    </div>
  );
}
