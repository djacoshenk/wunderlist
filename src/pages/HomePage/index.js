import React from 'react';

import { RestaurantSearchBarProvider } from '../../components/RestaurantSearchBar/RestaurantSearchBarContext';

import App from './App';

export default function HomePage() {
  return (
    <RestaurantSearchBarProvider>
      <App />
    </RestaurantSearchBarProvider>
  );
}
