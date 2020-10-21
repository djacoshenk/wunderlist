import React, { Fragment, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>
          Wunderlist - Find, share, and save your new favorite place
        </title>
        <meta name='title' content='Wunderlist' />
        <meta
          name='description'
          content='Wunderlist - Find, share, and save your new favorite place'
        />
        <meta name='image' content='https://wunderlist.me/image-preview.png' />
      </Helmet>
      <Header />
      <RestaurantSearchBar />
      <RestaurantTypeCards />
    </Fragment>
  );
}
