import { Fragment } from 'react';

import styles from 'pages/UserProfilePage/UserProfileCard/UserProfileCard.module.scss';
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

type CurrentUser = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
};

type Props = {
  currentUserProfile: CurrentUser | firebase.firestore.DocumentData | null;
  savedPlaces: firebase.firestore.DocumentData | Place[] | null;
};

export default function UserProfileCard({
  currentUserProfile,
  savedPlaces,
}: Props) {
  return (
    <Fragment>
      {currentUserProfile && (
        <div className={styles['user-profile-card-main-container']}>
          <div className={styles['user-profile-card-container']}>
            <div className={styles['user-profile-card-avatar']}>
              <i className='fas fa-user-circle'></i>
            </div>
            <div className={styles['user-profile-card-user-info']}>
              <div className={styles['user-profile-card-name']}>
                <p>{`${currentUserProfile.firstName} ${currentUserProfile.lastName}`}</p>
              </div>
              <div className={styles['user-profile-card-saved-places']}>
                <i className='fas fa-star'></i>
                <p>{savedPlaces ? savedPlaces.length : 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
