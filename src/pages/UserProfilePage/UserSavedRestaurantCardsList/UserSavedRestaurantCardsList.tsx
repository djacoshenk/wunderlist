import { Fragment } from 'react';

import UserSavedRestaurantCards from 'pages/UserProfilePage/UserSavedRestaurantCards/UserSavedRestaurantCards';

import styles from './UserSavedRestaurantCardsList.module.scss';

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

type CurrentUser = {
  userID: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  savedPlaces: Place[];
};

type Props = {
  currentUser: CurrentUser[];
};

export default function UserSavedRestaurantCardsList({ currentUser }: Props) {
  return (
    <Fragment>
      {currentUser === [] ? (
        <div className={styles['user-saved-cards-message']}>
          <p>You have not saved any places.</p>
        </div>
      ) : (
        <div className={styles['user-saved-cards-container']}>
          {currentUser[0].savedPlaces.map((place, index) => (
            <UserSavedRestaurantCards
              key={place.id}
              place={place}
              index={index + 1}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
}
