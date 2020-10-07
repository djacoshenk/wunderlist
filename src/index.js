import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { RestaurantProfileProvider } from './pages/RestaurantProfilePage/_Context/RestaurantProfileContext';

import './styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <RestaurantProfileProvider>
      <App />
    </RestaurantProfileProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
