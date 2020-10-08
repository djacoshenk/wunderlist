import React from 'react';
import block from 'bem-cn';

import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantCardList from '../RestaurantCardList/RestaurantCardList';

import './MainContent.scss';

const b = block('RestaurantSearchPage');

export default function MainContent() {
  return (
    <div className={b('main-container')}>
      <GoogleMap />
      <RestaurantCardList />
    </div>
  );
}
