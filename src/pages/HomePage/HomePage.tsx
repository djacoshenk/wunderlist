import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

import UserStatusLoader from './UserStatusLoader/UserStatusLoader';
import HamburgerMenuButton from 'shared/HamburgerMenuButton/HamburgerMenuButton';
import UserLoginRegisterBanner from 'shared/UserLoginRegisterBanner/UserLoginRegisterBanner';
import Header from './Header/Header';
import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantTypeCards from './RestaurantTypeCards/RestaurantTypeCards';

import { RootState } from 'store/index';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function HomePage(): JSX.Element {
  const { isLoading } = useTypedSelector((state) => state.loadingStatus);

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
        </Fragment>
      )}
    </Fragment>
  );
}
