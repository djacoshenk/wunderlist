import { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

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
  userID: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  savedPlaces: Place[];
};

export default function UserProfilePage() {
  const [userProfileIsLoading, setUserProfileIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser[]>([]);
  const location = useLocation<CurrentUser>();

  function formatLastNameInitial(lastName: string) {
    return lastName.substring(0, 1);
  }

  // check if there is a current user saved in local storage - returns a string or null
  const currentUserLocalStorage = localStorage.getItem('currentUser');

  useEffect(() => {
    if (typeof currentUserLocalStorage === 'string') {
      setCurrentUser(JSON.parse(currentUserLocalStorage));

      setTimeout(() => {
        setUserProfileIsLoading(false);
      }, 1000);
    }
  }, [currentUserLocalStorage]);

  return (
    <Fragment>
      <Helmet>
        {location.state ? (
          <title>{`wunderlist - ${
            location.state.first_name
          } ${formatLastNameInitial(
            location.state.last_name
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
          <UserProfileCard currentUser={currentUser} />
          <UserSavedRestaurantCardsList currentUser={currentUser} />
        </Fragment>
      )}
    </Fragment>
  );
}
