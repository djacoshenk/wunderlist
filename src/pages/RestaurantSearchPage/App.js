import React, { Fragment, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import Header from './Header/Header';
import RestaurantSearchBar from '../../components/RestaurantSearchBar/RestaurantSearchBar';
import MainContent from './MainContent/MainContent';
import RestaurantSearchLoader from './RestaurantSearchLoader/RestaurantSearchLoader';
import { RestaurantSearchContext } from './_Context/RestaurantSearchContext';

export default function App() {
  const params = useParams();
  const { term, location } = params;
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
      <Helmet>
        <title>
          Wunderlist - The best {term.toUpperCase()} in {location}
        </title>
      </Helmet>
      <Header />
      <RestaurantSearchBar />
      {showMainLoader ? <RestaurantSearchLoader /> : <MainContent />}
    </Fragment>
  );
}
