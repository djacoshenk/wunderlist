import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RestaurantProfileLoader from './RestaurantProfileLoader/RestaurantProfileLoader';
import RestaurantProfileCard from './RestaurantProfileCard/RestaurantProfileCard';

import './styles.scss';

export default function RestaurantProfilePage() {
  const params = useParams();
  const [place, setPlace] = useState([]);
  const [showMainLoader, setShowMainLoader] = useState(true);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function fetchPlace(slug) {
      const res = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
          },
        }
      );

      async function fetchReviews(slug) {
        const res = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${slug}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
            },
          }
        );

        setReviews(res.data.reviews);

        setShowMainLoader(false);
      }

      fetchReviews(params.slug);

      setPlace(res.data);
    }

    fetchPlace(params.slug);
  }, [params.slug]);

  return (
    <Fragment>
      {showMainLoader ? (
        <RestaurantProfileLoader />
      ) : (
        <RestaurantProfileCard place={place} reviews={reviews} />
      )}
    </Fragment>
  );
}
