import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from './Header/Header';
import HamburgerMenuButton from 'shared/HamburgerMenuButton/HamburgerMenuButton';
import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';
import MainContent from './MainContent/MainContent';
import RestaurantSearchLoader from './RestaurantSearchLoader/RestaurantSearchLoader';
import SortByButton from './SortByButton/SortByButton';

let offset = 10;

export default function RestaurantSearchPage() {
  const [places, setPlaces] = useState([]);
  const [sortByParam, setSortByParam] = useState('best_match');
  const [mapKey, setMapKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [asyncErrorMessages, setAsyncErrorMessages] = useState([]);
  const params = useParams();

  const fetchPlaces = useCallback(async ({ term, location }) => {
    try {
      const { data } = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
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

      setPlaces(data.businesses);
      setIsLoading(false);
    } catch (err) {
      setAsyncErrorMessages((prevState) => {
        return [...prevState, { err }];
      });
    }
  }, []);

  async function fetchMorePlaces({ term, location }, sortByParam) {
    try {
      const { data } = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
          },
          params: {
            sort_by: sortByParam,
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
      setAsyncErrorMessages((prevState) => {
        return [...prevState, { err }];
      });
    }
  }

  const fetchPlacesSortBy = useCallback(
    async ({ term, location }, sortByParam) => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
            },
            params: {
              sort_by: sortByParam,
              limit: 10,
            },
          }
        );

        setPlaces(data.businesses);
        setIsLoading(false);
      } catch (err) {
        setAsyncErrorMessages((prevState) => {
          return [...prevState, { err }];
        });
      }
    },
    []
  );

  useEffect(() => {
    setIsLoading(true);

    fetchPlaces(params);
  }, [setIsLoading, params, fetchPlaces]);

  return (
    <Fragment>
      <Helmet>
        <title>
          wunderlist - The best {params.term.toUpperCase()} in {params.location}
        </title>
      </Helmet>
      <HamburgerMenuButton />
      <Header />
      <RestaurantSearchBar />
      <SortByButton
        setSortByParam={setSortByParam}
        fetchPlacesSortBy={fetchPlacesSortBy}
      />
      {isLoading ? (
        <RestaurantSearchLoader />
      ) : (
        <MainContent
          places={places}
          sortByParam={sortByParam}
          mapKey={mapKey}
          fetchMorePlaces={fetchMorePlaces}
        />
      )}
    </Fragment>
  );
}
