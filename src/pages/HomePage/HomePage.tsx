import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import Footer from 'pages/HomePage/Footer/Footer';
import Header from 'pages/HomePage/Header/Header';
import RestaurantTypeCards from 'pages/HomePage/RestaurantTypeCards/RestaurantTypeCards';
import UserStatusLoader from 'pages/HomePage/UserStatusLoader/UserStatusLoader';
import HamburgerMenuButton from 'shared/HamburgerMenuButton/HamburgerMenuButton';
import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';
import UserLoginRegisterBanner from 'shared/UserLoginRegisterBanner/UserLoginRegisterBanner';
import { RootState } from 'store/store';

export default function HomePage() {
  const { isLoading } = useSelector((state: RootState) => state.loadingStatus);

  return (
    <Fragment>
      <Helmet>
        <title>wunderlist - find and save your new favorite place</title>
      </Helmet>
      {isLoading ? (
        <Fragment>
          <UserStatusLoader />
        </Fragment>
      ) : (
        <Fragment>
          <HamburgerMenuButton />
          <UserLoginRegisterBanner />
          <Header />
          <RestaurantSearchBar />
          <RestaurantTypeCards />
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
}
