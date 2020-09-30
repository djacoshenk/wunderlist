import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

import Header from './Header/Header';
import RestaurantSearchBar from './RestaurantSearchBar/RestaurantSearchBar';
import RestaurantProfileLoader from './RestaurantProfileLoader/RestaurantProfileLoader';
import RestaurantProfileCard from './RestaurantProfileCard/RestaurantProfileCard';

export default function RestaurantProfilePage() {
  const { alias } = useParams();
  const {
    state: { title },
  } = useLocation();
  const [place, setPlace] = useState([]);
  const [showMainLoader, setShowMainLoader] = useState(true);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function fetchPlace(alias) {
      const res = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${alias}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
          },
        }
      );

      async function fetchReviews(alias) {
        const res = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${alias}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
            },
          }
        );

        setReviews(res.data.reviews);

        setShowMainLoader(false);
      }

      fetchReviews(alias);

      setPlace(res.data);
    }

    fetchPlace(alias);
  }, [alias]);

  return (
    <Fragment>
      <Header />
      <RestaurantSearchBar />
      {showMainLoader ? (
        <RestaurantProfileLoader title={title} />
      ) : (
        <RestaurantProfileCard place={place} reviews={reviews} />
      )}
    </Fragment>
  );
}
