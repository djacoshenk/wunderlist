import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import RestaurantProfileImageCarousel from '../RestaurantProfileImageCarousel/RestaurantProfileImageCarousel';
import RestaurantRatingStars from 'shared/RestaurantRatingStars/RestaurantRatingStars';
import GoogleMap from '../GoogleMap/GoogleMap';
import RestaurantProfileCardReviews from '../RestaurantProfileCardReviews/RestaurantProfileCardReviews';

import styles from './RestaurantProfileCard.module.scss';

type Props = {
  place: Place;
  reviews: {
    reviews: Review[];
  };
};

type Place = {
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

type Categories = { title: string };

type Review = {
  user: {
    name: string;
  };
  rating: number;
  text: string;
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
      const currentUserData: CurrentUserLoggedInState[] = JSON.parse(
        currentUserLocalStorage
      );

      const currentUserSavedPlaces = currentUserData[0].savedPlaces;

      // loop through the current user's saved places and determine if the current restaurant is already saved
      // if it's already saved, then set it as being saved
      for (let i = 0; i < currentUserSavedPlaces.length; i++) {
        if (currentUserSavedPlaces[i].id === place.id) {
          setRestaurantIsSaved(true);

          break;
        }
      }

      setCurrentUserLoggedIn(JSON.parse(currentUserLocalStorage));
    } else {
      setCurrentUserLoggedIn(null);
    }
  }, [currentUserLocalStorage, place.id]);

  function saveRestaurantOnClick(place: Place) {
    if (typeof currentUserLocalStorage === 'string') {
      setRestaurantIsSaved(true);

      const currentUserData: CurrentUserLoggedInState[] = JSON.parse(
        currentUserLocalStorage
      );

      const currentUserSavedPlaces = currentUserData[0].savedPlaces;
      const updatedSavedPlaces = [...currentUserSavedPlaces, place];
      const updatedCurrentUserState = [
        { ...currentUserData[0], savedPlaces: updatedSavedPlaces },
      ];

      localStorage.setItem(
        'currentUser',
        JSON.stringify(updatedCurrentUserState)
      );
    }
  }

  function unsaveRestaurantOnClick(place: Place) {
    if (typeof currentUserLocalStorage === 'string') {
      setRestaurantIsSaved(false);

      const currentUserData: CurrentUserLoggedInState[] = JSON.parse(
        currentUserLocalStorage
      );

      const currentUserSavedPlaces = currentUserData[0].savedPlaces;
      const updatedSavedPlaces = currentUserSavedPlaces.filter(
        (res) => res.id !== place.id
      );

      const updatedCurrentUserState = [
        { ...currentUserData[0], savedPlaces: updatedSavedPlaces },
      ];

      localStorage.setItem(
        'currentUser',
        JSON.stringify(updatedCurrentUserState)
      );
    }
  }

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
                  onClick={() => unsaveRestaurantOnClick(place)}
                >
                  <i className='fas fa-star'></i>
                  <p>Saved</p>
                </button>
              ) : (
                <button
                  className={styles['restaurant-prof-save-btn']}
                  onClick={() => saveRestaurantOnClick(place)}
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
