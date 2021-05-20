import { Fragment } from 'react';

import UserSavedRestaurantCards from 'pages/UserProfilePage/UserSavedRestaurantCards/UserSavedRestaurantCards';
import styles from 'pages/UserProfilePage/UserSavedRestaurantCardsList/UserSavedRestaurantCardsList.module.scss';
import firebase from 'setupFirebase';

type Categories = {
  title: string;
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

type Props = {
  savedPlaces: firebase.firestore.DocumentData | Place[] | null;
};

export default function UserSavedRestaurantCardsList({ savedPlaces }: Props) {
  return (
    <Fragment>
      {savedPlaces ? (
        savedPlaces.length === 0 ? (
          <div className={styles['user-saved-cards-message']}>
            <p>You have not saved any places.</p>
          </div>
        ) : (
          <div className={styles['user-saved-cards-container']}>
            {savedPlaces.map((place: Place, index: number) => (
              <UserSavedRestaurantCards
                key={place.id}
                place={place}
                index={index + 1}
              />
            ))}
          </div>
        )
      ) : (
        <div className={styles['user-saved-cards-message']}>
          <p>You have not saved any places.</p>
        </div>
      )}
    </Fragment>
  );
}
