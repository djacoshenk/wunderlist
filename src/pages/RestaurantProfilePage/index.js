import React from 'react';

import { RestaurantProfileProvider } from './_Context/RestaurantProfileContext';
import { RestaurantSearchBarProvider } from '../../components/RestaurantSearchBar/RestaurantSearchBarContext';
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
