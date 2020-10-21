import React, { Fragment, useContext, useEffect } from 'react';

import Head from '../../components/Head/Head';
import Header from './Header/Header';
import RestaurantSearchBar from '../../components/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantTypeCards from './RestaurantTypeCards/RestaurantTypeCards';

import { RestaurantSearchBarContext } from '../../components/RestaurantSearchBar/RestaurantSearchBarContext';

export default function App() {
  const { setSearchParams } = useContext(RestaurantSearchBarContext);

  // initialize the location search param
  useEffect(() => {
    setSearchParams((prevState) => ({
      ...prevState,
      location: 'Los Angeles, CA',
    }));
  }, [setSearchParams]);

  return (
    <Fragment>
      <Head>
        <title>
          Find, share, and save your new favorite place - wunderlist
        </title>
      </Head>
      <Header />
      <RestaurantSearchBar />
      <RestaurantTypeCards />
    </Fragment>
  );
}
