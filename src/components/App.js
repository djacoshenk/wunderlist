import React, { useState, useEffect, Fragment } from 'react';

import Header from './Header';
import Search from './Search';
import Map from './Map';
import CardList from './CardList';

import axios from 'axios';

import '../styles/styles.scss';

export default function App() {
  const [places, setPlaces] = useState([]);
  const [center, setCenter] = useState({
    lat: 34.0407,
    lng: -118.2468,
  });
  const [offset, setOffset] = useState(10);
  const [loading, setLoading] = useState(false);

  const zoom = 13;
  const limit = 10;

  async function searchPlaces({ term, location }) {
    const res = await axios.get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        params: {
          sort_by: 'best_match',
          limit: limit,
        },
      }
    );

    setPlaces(res.data.businesses);
  }

  async function fetchMorePlaces({ term, location }) {
    const res = await axios.get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        params: {
          sort_by: 'review_count',
          limit: limit,
          offset: offset,
        },
      }
    );

    setOffset((prevState) => {
      return prevState + limit;
    });

    setPlaces((prevState) => {
      return prevState.concat(res.data.businesses);
    });
  }

  useEffect(() => {
    if (places.length === 0) {
      return;
    } else {
      const total = places.length;

      const avgLat =
        places
          .map((place) => {
            return place.coordinates.latitude;
          })
          .reduce((acc, curr) => {
            return acc + curr;
          }) / total;

      const avgLng =
        places
          .map((place) => {
            return place.coordinates.longitude;
          })
          .reduce((acc, curr) => {
            return acc + curr;
          }) / total;

      setCenter((prevState) => {
        return { ...prevState, lat: avgLat, lng: avgLng };
      });

      setLoading(true);
    }
  }, [places]);

  return (
    <Fragment>
      <Header />
      <Search searchPlaces={searchPlaces} setLoading={setLoading} />
      {loading ? (
        <div className='main-container'>
          <Map places={places} center={center} zoom={zoom} />
          <CardList places={places} />
        </div>
      ) : null}
    </Fragment>
  );
}
