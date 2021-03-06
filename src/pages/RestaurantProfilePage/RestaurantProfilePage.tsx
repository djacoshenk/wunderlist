import { Fragment, useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router-dom';

import Header from 'pages/RestaurantProfilePage/Header/Header';
import RestaurantProfileCard from 'pages/RestaurantProfilePage/RestaurantProfileCard/RestaurantProfileCard';
import RestaurantProfileLoader from 'pages/RestaurantProfilePage/RestaurantProfileLoader/RestaurantProfileLoader';
import HamburgerMenuButton from 'shared/HamburgerMenuButton/HamburgerMenuButton';
import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';

type Categories = { title: string };

type PlaceState = {
  id: string;
  alias: string;
  photos: string[];
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
    const cancelToken = axios.CancelToken;
    const cancelTokenSource = cancelToken.source();

    async function fetchData(alias: string): Promise<void> {
      try {
        // fetch data on place
        const placeRes = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${alias}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
            },
            cancelToken: cancelTokenSource.token,
          }
        );

        // fetch data on reviews
        const reviewsRes = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${alias}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
            },
            cancelToken: cancelTokenSource.token,
          }
        );

        setPlace(placeRes.data);
        setReviews(reviewsRes.data);

        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      } catch (err) {
        Sentry.captureException(err);
      }
    }

    // fetch data and disable the main loader
    fetchData(alias);

    return () => cancelTokenSource.cancel();
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
