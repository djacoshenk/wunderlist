import { Fragment } from 'react';

import styles from './UserProfileCard.module.scss';

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

export default function UserProfileCard({ currentUser }: Props) {
  return (
    <Fragment>
      {
        <div className={styles['user-profile-card-main-container']}>
          <div className={styles['user-profile-card-container']}>
            <div className={styles['user-profile-card-avatar']}>
              <i className='fas fa-user-circle'></i>
            </div>
            <div className={styles['user-profile-card-user-info']}>
              <div className={styles['user-profile-card-name']}>
                <p>{`${currentUser[0].first_name} ${currentUser[0].last_name}`}</p>
              </div>
              <div className={styles['user-profile-card-saved-places']}>
                <i className='fas fa-star'></i>
                <p>{currentUser[0].savedPlaces.length}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
}
