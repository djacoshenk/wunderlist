import { useEffect, useState, useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { Link } from 'react-router-dom';

import firebase, { auth, firestore } from 'setupFirebase';
import GoogleMap from 'pages/RestaurantProfilePage/GoogleMap/GoogleMap';
import RestaurantProfileCardReviews from 'pages/RestaurantProfilePage/RestaurantProfileCardReviews/RestaurantProfileCardReviews';
import RestaurantProfileImageCarousel from 'pages/RestaurantProfilePage/RestaurantProfileImageCarousel/RestaurantProfileImageCarousel';
import styles from 'pages/RestaurantProfilePage/RestaurantProfileCard/RestaurantProfileCard.module.scss';
import RestaurantRatingStars from 'shared/RestaurantRatingStars/RestaurantRatingStars';

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

type CurrentUser = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
};

type CurrentUserLoggedIn = CurrentUser | firebase.firestore.DocumentData;

export default function RestaurantProfileCard({ place, reviews }: Props) {
  const [
    currentUserLoggedIn,
    setCurrentUserLoggedIn,
  ] = useState<CurrentUserLoggedIn | null>(null);
  const [restaurantIsSaved, setRestaurantIsSaved] = useState(false);

  function formatNameForUrl(name: string): string {
    return name.split(' ').join('+');
  }

  function formatAddressForUrl(address: string[]): string {
    return address.join(' ').split(' ').join('+');
  }

  const verifyRestaurantIsSaved = useCallback(async () => {
    try {
      // if there is a current user, we want to verify if the current restaurant has been saved by them
      if (auth.currentUser) {
        const { uid } = auth.currentUser;

        // check if they've saved places under their user id
        const snapshot = await firestore
          .collection('savedPlaces')
          .doc(uid)
          .get();

        // if they have saved places
        if (snapshot.exists) {
          const data = snapshot.data();

          // if the snapshot exists and there is data, then find the restaurant in the savedPlaces array
          if (data) {
            const savedPlace = data.savedPlaces.find((res: Place) => {
              return res.id === place.id ? res : null;
            });

            // if the current restaurant is saved, then toggle restaurantIsSaved to true
            const isSaved = data.savedPlaces.includes(savedPlace);

            // toggle restaurantIsSaved
            setRestaurantIsSaved(isSaved);
          }
        }
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }, [place.id]);

  useEffect(() => {
    // fetch current user from local storage
    const currentUserLocalStorage = localStorage.getItem('currentUser');

    // if the local storage has data, retrieve it and set it into component state
    if (currentUserLocalStorage) {
      setCurrentUserLoggedIn(JSON.parse(currentUserLocalStorage));
    }

    verifyRestaurantIsSaved();
  }, [verifyRestaurantIsSaved]);

  async function saveRestaurantOnClick(place: Place): Promise<void> {
    try {
      // if there is a current user, we want to save the restaurant to the database under their user id
      if (auth.currentUser) {
        const { uid } = auth.currentUser;

        const snapshot = await firestore
          .collection('savedPlaces')
          .doc(uid)
          .get();

        // if there are no saved places in the database then set one
        if (!snapshot.exists) {
          await firestore
            .collection('savedPlaces')
            .doc(uid)
            .set({ savedPlaces: [place] });
          // if there are saved places in the database then add to the array
        } else {
          await firestore
            .collection('savedPlaces')
            .doc(uid)
            .update({
              savedPlaces: firebase.firestore.FieldValue.arrayUnion(place),
            });
        }

        // restaurant is saved, so true
        setRestaurantIsSaved(true);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async function unsaveRestaurantOnClick(place: Place): Promise<void> {
    try {
      // if there is a current user, then we want to remove the saved restaurant from the database under their user id
      if (auth.currentUser) {
        const { uid } = auth.currentUser;

        const snapshot = await firestore
          .collection('savedPlaces')
          .doc(uid)
          .get();

        // if the snapshot exists, remove the place from saved places
        if (snapshot.exists) {
          const data = snapshot.data();

          // if data exists in the snapshot, then find the restaurant in the savedPlaces array
          if (data) {
            const savedPlace = data.savedPlaces.find((res: Place) => {
              return res.id === place.id ? res : null;
            });

            await firestore
              .collection('savedPlaces')
              .doc(uid)
              .update({
                savedPlaces: firebase.firestore.FieldValue.arrayRemove(
                  savedPlace
                ),
              });

            // restaurant is unsaved, so false
            setRestaurantIsSaved(false);
          }
        }
      }
    } catch (error) {
      Sentry.captureException(error);
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
                pathname: `https://www.google.com/maps/search/?api=1&query=${formatNameForUrl(
                  place.name
                )}%2C+${formatAddressForUrl(place.location.display_address)}`,
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
