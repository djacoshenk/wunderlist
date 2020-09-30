import React, { useState, Fragment, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import axios from 'axios';

import Header from './Header/Header';
import SearchRestaurantBar from './SearchRestaurantBar/SearchRestaurantBar';
import MainContent from './MainContent/MainContent';
import SearchRestaurantLoader from './SearchRestaurantLoader/SearchRestaurantLoader';

export default function RestaurantSearchPage() {
  const [places, setPlaces] = useState([]);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [mapKey, setMapKey] = useState(0);
  const params = useParams();
  const history = useHistory();

  let offset = 10;

  useEffect(() => {
    fetchPlaces(params);
  }, [params]);

  async function fetchPlaces({ term, location }) {
    const res = await axios.get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        params: {
          limit: 10,
        },
      }
    );

    // update places array
    setPlaces(res.data.businesses);

    // remove main content loader
    setShowLoader(false);

    // load map with markers and cards
    setShowMainContent(true);
  }

  async function fetchMorePlaces({ term, location }) {
    const res = await axios.get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        params: {
          sort_by: 'best_match',
          limit: 10,
          offset: offset,
        },
      }
    );

    // increment offset counter
    offset += 10;

    // add new places to current places array
    setPlaces((prevState) => {
      return prevState.concat(res.data.businesses);
    });

    // increment map key, so map re-renders
    setMapKey((prevState) => {
      return prevState + 1;
    });
  }

  function handleFormSubmit(term, location) {
    // remove main content
    setShowMainContent(false);

    // show main content loader
    setShowLoader(true);

    history.push(`/search/${term}/${location}`);
  }

  return (
    <Fragment>
      <Header />
      <SearchRestaurantBar
        handleFormSubmit={handleFormSubmit}
        params={params}
      />
      {showLoader ? (
        <SearchRestaurantLoader params={params} />
      ) : showMainContent ? (
        <MainContent
          places={places}
          mapKey={mapKey}
          params={params}
          fetchMorePlaces={fetchMorePlaces}
        />
      ) : null}
    </Fragment>
  );
}
