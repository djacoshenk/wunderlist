import React from 'react';

import { RestaurantSearchProvider } from './_Context/RestaurantSearchContext';
import App from './App';

export default function RestaurantSearchPage() {
  return (
    <RestaurantSearchProvider>
      <App />
    </RestaurantSearchProvider>
  );
}
