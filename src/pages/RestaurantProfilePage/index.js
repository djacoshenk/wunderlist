import React from 'react';

import { RestaurantProfileProvider } from './_Context/RestaurantProfileContext';
import { RestaurantSearchBarProvider } from '../../shared/RestaurantSearchBar/RestaurantSearchBarContext';
import App from './App';

export default function RestaurantProfilePage() {
  return (
    <RestaurantProfileProvider>
      <RestaurantSearchBarProvider>
        <App />
      </RestaurantSearchBarProvider>
    </RestaurantProfileProvider>
  );
}
