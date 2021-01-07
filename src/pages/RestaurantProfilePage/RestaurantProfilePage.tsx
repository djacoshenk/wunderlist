import React, { useEffect, Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import HamburgerMenuButton from 'shared/HamburgerMenuButton/HamburgerMenuButton';
import Header from './Header/Header';
import RestaurantSearchBar from '../../shared/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantProfileLoader from './RestaurantProfileLoader/RestaurantProfileLoader';
import RestaurantProfileCard from './RestaurantProfileCard/RestaurantProfileCard';

interface Place {
  photos: string[];
  name: string;
  rating: number;
  review_count: number;
  price: string;
  categories: [{ title: string }];
  display_phone: string;
  location: {
    display_address: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  id: string;
}

interface Review {
  user: {
    name: string;
  };
  rating: number;
  text: string;
}

interface Reviews {
  reviews: Review[];
}

interface ParamsState {
  alias: string;
}

export default function RestaurantProfilePage(): JSX.Element {
  const [place, setPlace] = useState<Place>();
  const [reviews, setReviews] = useState<Reviews>();
  const [isLoading, setIsLoading] = useState(true);
  const [asyncErrorMessage, setAsyncErrorMessage] = useState('');

  const { alias } = useParams<ParamsState>();

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
        setAsyncErrorMessage(err);
      }
    }

    // fetch data and disable the main loader
    fetchData(alias);
  }, [alias]);

  return (
    <Fragment>
      <Helmet>
        {place.name ? (
          <title>{`wunderlist - ${place.name}`}</title>
        ) : (
          <title>wunderlist - find and save your new favorite place</title>
        )}
      </Helmet>
      <HamburgerMenuButton />
      <Header />
      <RestaurantSearchBar />
      {isLoading ? (
        <RestaurantProfileLoader name={place.name} />
      ) : (
        <RestaurantProfileCard place={place} reviews={reviews} />
      )}
    </Fragment>
  );
}
