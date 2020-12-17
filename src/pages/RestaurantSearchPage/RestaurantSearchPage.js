import React, { Fragment, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import UserLoginRegisterBanner from 'shared/UserLoginRegisterBanner/UserLoginRegisterBanner';
import Header from './Header/Header';
import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';
import MainContent from './MainContent/MainContent';
import RestaurantSearchLoader from './RestaurantSearchLoader/RestaurantSearchLoader';
import { RestaurantSearchContext } from './_Context/RestaurantSearchContext';

export default function RestaurantSearchPage() {
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
      <Helmet>
        <title>
          wunderlist - The best {params.term.toUpperCase()} in {params.location}
        </title>
      </Helmet>
      <UserLoginRegisterBanner />
      <Header />
      <RestaurantSearchBar />
      {showMainLoader ? <RestaurantSearchLoader /> : <MainContent />}
    </Fragment>
  );
}
