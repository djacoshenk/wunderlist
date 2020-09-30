import React from 'react';
import { block } from 'bem-cn';

import Header from './Header/Header';
import SearchRestaurantBar from './SearchRestaurantBar/SearchRestaurantBar';

import './styles.scss';

const b = block('HomePage');

export default function HomePage() {
  return (
    <div className={b('home-container')}>
      <Header />
      <SearchRestaurantBar />
    </div>
  );
}
