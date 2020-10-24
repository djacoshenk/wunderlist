import React from 'react';

import { RestaurantProfileProvider } from './_Context/RestaurantProfileContext';
import App from './App';

export default function RestaurantProfilePage() {
  return (
    <RestaurantProfileProvider>
      <App />
    </RestaurantProfileProvider>
  );
}
