import { Fragment, useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router-dom';

import firebase, { firestore } from 'setupFirebase';
import Header from './Header/Header';
import HamburgerMenuButton from 'shared/HamburgerMenuButton/HamburgerMenuButton';
import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';
import UserProfileCard from './UserProfileCard/UserProfileCard';
import UserSavedRestaurantCardsList from './UserSavedRestaurantCardsList/UserSavedRestaurantCardsList';

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

type CurrentUserProfile = CurrentUser | firebase.firestore.DocumentData;

type SavedPlaces = firebase.firestore.DocumentData | Place[];

type LocationState = CurrentUser;

type ParamsState = {
  uid: string;
};

export default function UserProfilePage() {
  const [userProfileIsLoading, setUserProfileIsLoading] = useState(true);
  const [
    currentUserProfile,
    setCurrentUserProfile,
  ] = useState<CurrentUserProfile | null>(null);
  const [savedPlaces, setSavedPlaces] = useState<SavedPlaces | null>(null);
  const location = useLocation<LocationState>();
  const params = useParams<ParamsState>();

  function formatLastNameInitial(lastName: string) {
    return lastName.substring(0, 1);
  }

  const fetchUserProfileData = useCallback(async () => {
    // grab the user id from the params
    const { uid } = params;

    // use the user id to fetch the user and savedPlaces data
    const userSnapshot = await firestore.collection('users').doc(uid).get();
    const savedPlacesSnapshot = await firestore
      .collection('savedPlaces')
      .doc(uid)
      .get();

    if (userSnapshot.exists) {
      const userData = userSnapshot.data();

      if (userData) {
        setCurrentUserProfile(userData);
      }
    }

    if (savedPlacesSnapshot.exists) {
      const savedPlacesData = savedPlacesSnapshot.data();

      if (savedPlacesData) {
        setSavedPlaces(savedPlacesData.savedPlaces);
      }
    }
  }, [params]);

  useEffect(() => {
    fetchUserProfileData();

    setTimeout(() => {
      setUserProfileIsLoading(false);
    }, 4000);
  }, [fetchUserProfileData]);

  return (
    <Fragment>
      <Helmet>
        {location.state ? (
          <title>{`wunderlist - ${
            location.state.firstName
          } ${formatLastNameInitial(
            location.state.lastName
          )}.'s Profile`}</title>
        ) : (
          <title>wunderlist - find and save your new favorite place</title>
        )}
      </Helmet>
      <HamburgerMenuButton />
      <Header />
      {userProfileIsLoading ? (
        <RestaurantLoaderBubbles />
      ) : (
        <Fragment>
          <UserProfileCard
            currentUserProfile={currentUserProfile}
            savedPlaces={savedPlaces}
          />
          <UserSavedRestaurantCardsList savedPlaces={savedPlaces} />
        </Fragment>
      )}
    </Fragment>
  );
}
