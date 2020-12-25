import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import UserLoginRegisterBanner from 'shared/UserLoginRegisterBanner/UserLoginRegisterBanner';
import Header from './Header/Header';
import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';
import MainContent from './MainContent/MainContent';
import RestaurantSearchLoader from './RestaurantSearchLoader/RestaurantSearchLoader';

let offset = 10;

export default function RestaurantSearchPage() {
  const [places, setPlaces] = useState([]);
  const [mapKey, setMapKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function fetchPlaces({ term, location }) {
      try {
        const { data } = await axios.get(
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

        setPlaces(data.businesses);
        setIsLoading(false);
      } catch (err) {
        throw new Error('COULD NOT FETCH DATA');
      }
    }

    fetchPlaces(params);
  }, [params]);

  async function fetchMorePlaces({ term, location }) {
    try {
      const { data } = await axios.get(
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

      offset += 10;

      setPlaces((prevState) => {
        return prevState.concat(data.businesses);
      });
      setMapKey(mapKey + 1);
    } catch (err) {
      throw new Error('COULD NOT FETCH MORE DATA');
    }
  }

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
      {isLoading ? (
        <RestaurantSearchLoader />
      ) : (
        <MainContent
          places={places}
          mapKey={mapKey}
          fetchMorePlaces={fetchMorePlaces}
        />
      )}
    </Fragment>
  );
}
