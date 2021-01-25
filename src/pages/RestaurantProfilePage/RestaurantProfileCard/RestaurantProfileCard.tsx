import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import RestaurantProfileImageCarousel from '../RestaurantProfileImageCarousel/RestaurantProfileImageCarousel';
import RestaurantRatingStars from 'shared/RestaurantRatingStars/RestaurantRatingStars';
import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantProfileCardReviews from '../RestaurantProfileCardReviews/RestaurantProfileCardReviews';

import styles from './RestaurantProfileCard.module.scss';

type Categories = { title: string };

type Review = {
  user: {
    name: string;
  };
  rating: number;
  text: string;
};

type Props = {
  place: {
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
  reviews: {
    reviews: Review[];
  };
};

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

type CurrentUserLoggedInState = {
  userID: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  savedPlaces: Place[];
};

export default function RestaurantProfileCard({ place, reviews }: Props) {
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState<
    CurrentUserLoggedInState[] | null
  >(null);
  const [restaurantIsSaved, setRestaurantIsSaved] = useState(false);

  function formatNameForUrl() {
    return place.name.split(' ').join('+');
  }

  function formatAddressForUrl() {
    return place.location.display_address.join(' ').split(' ').join('+');
  }

  // check if there is a current user logged in
  const currentUserLocalStorage = localStorage.getItem('currentUser');

  useEffect(() => {
    if (typeof currentUserLocalStorage === 'string') {
      setCurrentUserLoggedIn(JSON.parse(currentUserLocalStorage));
    } else {
      setCurrentUserLoggedIn(null);
    }
  }, [currentUserLocalStorage]);

  return (
    <div className={styles['restaurant-prof-card']}>
      <div className={styles['restaurant-prof-main']}>
        <div className={styles['restaurant-prof-images']}>
          <RestaurantProfileImageCarousel photos={place.photos} />
        </div>
        <div className={styles['restaurant-prof-text-btn']}>
          <div className={styles['restaurant-prof-title']}>
            <h3>{place.name}</h3>
          </div>
          <div className={styles['restaurant-prof-stars-reviews']}>
            <RestaurantRatingStars rating={place.rating} />
            <p>{place.review_count} Reviews</p>
          </div>
          <div className={styles['restaurant-prof-price-category']}>
            <p>
              {place.price && `${place.price} \u2022`}{' '}
              {place.categories
                .map((tag) => {
                  return tag.title;
                })
                .join(', ')}
            </p>
          </div>
          {place.display_phone && (
            <div className={styles['restaurant-prof-phone']}>
              <p>{place.display_phone}</p>
            </div>
          )}
          <div className={styles['restaurant-prof-address']}>
            {place.location.display_address.map((adrs, index) => {
              return <p key={index}>{adrs}</p>;
            })}
          </div>
          {currentUserLoggedIn && (
            <div className={styles['restaurant-prof-save-btn-container']}>
              {restaurantIsSaved ? (
                <button
                  className={styles['restaurant-prof-saved-btn']}
                  onClick={() => setRestaurantIsSaved(false)}
                >
                  <i className='fas fa-star'></i>
                  <p>Saved</p>
                </button>
              ) : (
                <button
                  className={styles['restaurant-prof-save-btn']}
                  onClick={() => setRestaurantIsSaved(true)}
                >
                  <i className='far fa-star'></i>
                  <p>Save</p>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles['restaurant-prof-map-reviews']}>
        <div className={styles['restaurant-prof-map-directions']}>
          <GoogleMap place={place} />
          <div className={styles['restaurant-prof-directions-btn']}>
            <Link
              to={{
                pathname: `https://www.google.com/maps/search/?api=1&query=${formatNameForUrl()}%2C+${formatAddressForUrl()}`,
              }}
              target='_blank'
            >
              <button>Directions</button>
            </Link>
          </div>
        </div>
        <div className={styles['restaurant-prof-reviews-container']}>
          <RestaurantProfileCardReviews reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
