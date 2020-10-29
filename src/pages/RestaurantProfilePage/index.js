import React, { useEffect, Fragment, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { RestaurantProfileContext } from './_Context/RestaurantProfileContext';

import Header from './Header/Header';
import RestaurantSearchBar from '../../shared/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantProfileLoader from './RestaurantProfileLoader/RestaurantProfileLoader';
import RestaurantProfileCard from './RestaurantProfileCard/RestaurantProfileCard';

export default function RestaurantProfilePage() {
  const { alias } = useParams();
  const {
    state: { showMainLoader, place },
    toggleMainLoader,
    fetchData,
  } = useContext(RestaurantProfileContext);

  useEffect(() => {
    // enable the main loader
    toggleMainLoader();

    // fetch data and disable the main loader
    fetchData(alias);
  }, [alias, toggleMainLoader, fetchData]);

  return (
    <Fragment>
      <Helmet>
        {place.name ? (
          <title>{`Wunderlist - ${place.name}`}</title>
        ) : (
          <title>
            Wunderlist - Find, share, and save your new favorite place
          </title>
        )}
      </Helmet>
      <Header />
      <RestaurantSearchBar />
      {showMainLoader ? <RestaurantProfileLoader /> : <RestaurantProfileCard />}
    </Fragment>
  );
}
