import React, { Fragment, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Header from './Header/Header';
import RestaurantSearchBar from './RestaurantSearchBar/RestaurantSearchBar';
import MainContent from './MainContent/MainContent';
import RestaurantSearchLoader from './RestaurantSearchLoader/RestaurantSearchLoader';
import { RestaurantSearchContext } from './_Context/RestaurantSearchContext';

export default function App() {
  const { state, showMainLoader, fetchPlaces } = useContext(
    RestaurantSearchContext
  );
  const params = useParams();

  useEffect(() => {
    showMainLoader();

    fetchPlaces(params);
  }, []);

  return (
    <Fragment>
      <Header />
      <RestaurantSearchBar />
      {state.showMainLoader ? <RestaurantSearchLoader /> : <MainContent />}
    </Fragment>
  );
}
