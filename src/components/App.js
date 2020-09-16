import React, { useState, Fragment } from 'react';

import axios from 'axios';

import Header from './Header';
import Search from './Search';
import Map from './Map';
import CardList from './CardList';
import IsLoading from './IsLoading';

import '../styles/styles.scss';

export default function App() {
  const [searchParams, setSearchParams] = useState({
    term: '',
    location: 'Los Angeles, CA',
  });
  const [places, setPlaces] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoverID, setHoverID] = useState('');

  function handleChange(e) {
    let { name, value } = e.target;

    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // remove main content
    setHasLoaded(false);

    // show the main content loader
    setIsLoading(true);

    // fetch data
    searchPlaces(searchParams);
  }

  async function searchPlaces({ term, location }) {
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
    setIsLoading(false);

    // load map with markers and cards
    setHasLoaded(true);
  }

  function handleHover(e) {
    const { id } = e.target;

    if (e.type === 'mouseenter') {
      setHoverID(id);
    } else if (e.type === 'mouseleave') {
      setHoverID('');
    }
  }

  return (
    <Fragment>
      <Header />
      <Search
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        term={searchParams.term}
        location={searchParams.location}
      />

      {isLoading ? (
        <IsLoading term={searchParams.term} location={searchParams.location} />
      ) : null}

      {hasLoaded ? (
        <div className='main-container'>
          <Map places={places} hoverID={hoverID} handleHover={handleHover} />
          <CardList
            places={places}
            setPlaces={setPlaces}
            searchParams={searchParams}
            handleHover={handleHover}
          />
        </div>
      ) : null}
    </Fragment>
  );
}
