import React, { useState, Fragment } from 'react';

import axios from 'axios';

import Header from './Header/Header';
import SearchRestaurantBar from './SearchRestaurantBar/SearchRestaurantBar';
import MainContent from './MainContent/MainContent';
import SearchRestaurantLoader from './SearchRestaurantLoader/SearchRestaurantLoader';

import './styles.scss';

export default function RestaurantProfilePage() {
  const [searchParams, setSearchParams] = useState({
    term: '',
    location: 'Los Angeles, CA',
  });
  const [places, setPlaces] = useState([]);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [hoverID, setHoverID] = useState('');
  const [mapKey, setMapKey] = useState(0);

  let offset = 10;

  function handleChange(name, value) {
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit() {
    // remove main content
    setShowMainContent(false);

    // show loader
    setShowLoader(true);

    // fetch data
    fetchPlaces(searchParams);
  }

  async function fetchPlaces({ term, location }) {
    const res = await axios.get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        params: {
          sort_by: 'best_match',
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

    // add new places to current places array
    setPlaces((prevState) => {
      return prevState.concat(res.data.businesses);
    });

    // increment map key, so map re-renders
    setMapKey((prevState) => {
      return prevState + 1;
    });

    // increment offset counter
    offset += 10;
  }

  function handleHover(e, id) {
    if (e.type === 'mouseenter') {
      setHoverID(id);
    } else if (e.type === 'mouseleave') {
      setHoverID('');
    }
  }

  return (
    <Fragment>
      <Header />
      <SearchRestaurantBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchParams={searchParams}
      />
      {showLoader ? (
        <SearchRestaurantLoader searchParams={searchParams} />
      ) : null}
      {showMainContent ? (
        <MainContent
          places={places}
          hoverID={hoverID}
          handleHover={handleHover}
          mapKey={mapKey}
          searchParams={searchParams}
          fetchMorePlaces={fetchMorePlaces}
        />
      ) : null}
    </Fragment>
  );
}
