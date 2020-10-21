import React from 'react';

import { RestaurantSearchProvider } from './_Context/RestaurantSearchContext';
import { RestaurantSearchBarProvider } from '../../components/RestaurantSearchBar/RestaurantSearchBarContext';
import App from './App';

export default function RestaurantSearchPage() {
  return (
    <RestaurantSearchProvider>
      <RestaurantSearchBarProvider>
        <App />
      </RestaurantSearchBarProvider>
    </RestaurantSearchProvider>
  );
}
