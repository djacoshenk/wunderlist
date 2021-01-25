import React, { useEffect, Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import axios from 'axios';

import HamburgerMenuButton from 'shared/HamburgerMenuButton/HamburgerMenuButton';
import Header from './Header/Header';
import RestaurantSearchBar from '../../shared/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantProfileLoader from './RestaurantProfileLoader/RestaurantProfileLoader';
import RestaurantProfileCard from './RestaurantProfileCard/RestaurantProfileCard';

type Categories = { title: string };

type PlaceState = {
  photos: string[];
  name: string;
  rating: number;
  review_count: number;
  price: string;
  categories: Categories[];
  display_phone: string;
  location: {
    display_address: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  id: string;
};

type Review = {
  user: {
    name: string;
  };
  rating: number;
  text: string;
};

type ReviewsState = {
  reviews: Review[];
};

type ParamsState = {
  alias: string;
};

type LocationState = {
  place: string;
};

export default function RestaurantProfilePage() {
  const [place, setPlace] = useState<PlaceState>({} as PlaceState);
  const [reviews, setReviews] = useState<ReviewsState>({} as ReviewsState);
  const [isLoading, setIsLoading] = useState(true);
  const { alias } = useParams<ParamsState>();
  const location = useLocation<LocationState>();

  useEffect(() => {
    async function fetchData(alias: string) {
      try {
        // fetch data on place
        const placeRes = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${alias}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
            },
          }
        );

        // fetch data on reviews
        const reviewsRes = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${alias}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
            },
          }
        );

        setPlace(placeRes.data);
        setReviews(reviewsRes.data);
        setIsLoading(false);
      } catch (err) {
        Sentry.captureException(err);
        setIsLoading(false);
      }
    }

    // fetch data and disable the main loader
    fetchData(alias);
  }, [alias]);

  return (
    <Fragment>
      <Helmet>
        {location.state.place ? (
          <title>{`wunderlist - ${location.state.place}`}</title>
        ) : (
          <title>wunderlist - find and save your new favorite place</title>
        )}
      </Helmet>
      <HamburgerMenuButton />
      <Header />
      <RestaurantSearchBar />
      {isLoading ? (
        <RestaurantProfileLoader name={location.state.place} />
      ) : (
        <RestaurantProfileCard place={place} reviews={reviews} />
      )}
    </Fragment>
  );
}
