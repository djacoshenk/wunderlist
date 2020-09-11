import React, { useState, Fragment } from 'react';

import Header from './Header';
import Search from './Search';
import Map from './Map';
import CardList from './CardList';

import axios from 'axios';

import '../styles/styles.scss';

export default function App() {
  const [places, setPlaces] = useState([]);

  async function searchPlaces(term, location) {
    const res = await axios.get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        params: {
          sort_by: 'review_count',
          limit: 30,
        },
      }
    );

    setPlaces(res.data.businesses);
  }

  return (
    <Fragment>
      <Header />
      <Search searchPlaces={searchPlaces} places={places} />
      <div className='main-container'>
        <Map places={places} />
        <CardList places={places} />
      </div>
    </Fragment>
  );
}
