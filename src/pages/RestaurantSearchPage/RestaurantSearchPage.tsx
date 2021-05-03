import { Fragment, useCallback, useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import Header from 'pages/RestaurantSearchPage/Header/Header';
import MainContent from 'pages/RestaurantSearchPage/MainContent/MainContent';
import SortByButton from 'pages/RestaurantSearchPage/SortByButton/SortByButton';
import HamburgerMenuButton from 'shared/HamburgerMenuButton/HamburgerMenuButton';
import RestaurntLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';
import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';

type SortByParam = 'best_match' | 'rating' | 'review_count' | 'distance';
interface ParamsState {
  term: string;
  location: string;
}

type Place = {
  id: string;
  alias: string;
  image_url: string;
  name: string;
  rating: number;
  review_count: number;
  price: string;
  categories: Categories[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  display_phone: string;
  location: {
    display_address: string[];
  };
};

type Categories = {
  title: string;
};

let offset = 10;

export default function RestaurantSearchPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [sortByParam, setSortByParam] = useState<SortByParam>('best_match');
  const [mapKey, setMapKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams<ParamsState>();

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
      Sentry.captureException(err);
    }
  }, []);

  async function fetchMorePlaces(
    { term, location }: ParamsState,
    sortByParam: string
  ) {
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
      setMapKey((prevState) => {
        return prevState + 1;
      });
    } catch (err) {
      Sentry.captureException(err);
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
        Sentry.captureException(err);
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
        <RestaurntLoaderBubbles />
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
