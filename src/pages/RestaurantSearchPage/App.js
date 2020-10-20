import React, { Fragment, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Header from './Header/Header';
import RestaurantSearchBar from '../../components/RestaurantSearchBar/RestaurantSearchBar';
import MainContent from './MainContent/MainContent';
import RestaurantSearchLoader from './RestaurantSearchLoader/RestaurantSearchLoader';
import { RestaurantSearchContext } from './_Context/RestaurantSearchContext';

export default function App() {
  const params = useParams();
  const {
    state: { showMainLoader },
    toggleMainLoader,
    fetchPlaces,
  } = useContext(RestaurantSearchContext);

  useEffect(() => {
    toggleMainLoader();

    fetchPlaces(params);
  }, [params, toggleMainLoader, fetchPlaces]);

  return (
    <Fragment>
      <Header />
      <RestaurantSearchBar />
      {showMainLoader ? <RestaurantSearchLoader /> : <MainContent />}
    </Fragment>
  );
}
