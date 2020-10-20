import React from 'react';

import Header from './Header/Header';
import RestaurantSearchBar from '../../components/RestaurantSearchBar/RestaurantSearchBar';

import styles from './styles.module.scss';

export default function HomePage() {
  return (
    <div className={styles['home-container']}>
      <Header />
      <RestaurantSearchBar />
    </div>
  );
}
