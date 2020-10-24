import React from 'react';

import { RestaurantSearchBarProvider } from '../../shared/RestaurantSearchBar/RestaurantSearchBarContext';

import App from './App';

export default function HomePage() {
  return (
    <RestaurantSearchBarProvider>
      <App />
    </RestaurantSearchBarProvider>
  );
}
