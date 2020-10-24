import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Header from './Header/Header';
import RestaurantSearchBar from '../../shared/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantTypeCards from './RestaurantTypeCards/RestaurantTypeCards';

export default function App() {
  return (
    <Fragment>
      <Helmet>
        <title>
          Wunderlist - Find, share, and save your new favorite place
        </title>
      </Helmet>
      <Header />
      <RestaurantSearchBar />
      <RestaurantTypeCards />
    </Fragment>
  );
}
