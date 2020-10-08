import React, { useEffect, Fragment, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { RestaurantProfileContext } from './_Context/RestaurantProfileContext';

import Header from './Header/Header';
import RestaurantSearchBar from './RestaurantSearchBar/RestaurantSearchBar';
import RestaurantProfileLoader from './RestaurantProfileLoader/RestaurantProfileLoader';
import RestaurantProfileCard from './RestaurantProfileCard/RestaurantProfileCard';

export default function App() {
  const { state, setMainLoader, fetchData } = useContext(
    RestaurantProfileContext
  );
  const { alias } = useParams();

  useEffect(() => {
    // enable the main loader
    setMainLoader();

    // fetch data and disable the main loader
    fetchData(alias);
  }, [alias, setMainLoader, fetchData]);

  return (
    <Fragment>
      <Header />
      <RestaurantSearchBar />
      {state.showMainLoader ? (
        <RestaurantProfileLoader />
      ) : (
        <RestaurantProfileCard />
      )}
    </Fragment>
  );
}
