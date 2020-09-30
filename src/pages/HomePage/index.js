import React from 'react';
import { block } from 'bem-cn';

import Header from './Header/Header';
import RestaurantSearchBar from './RestaurantSearchBar/RestaurantSearchBar';

import './styles.scss';

const b = block('HomePage');

export default function HomePage() {
  return (
    <div className={b('home-container')}>
      <Header />
      <RestaurantSearchBar />
    </div>
  );
}
