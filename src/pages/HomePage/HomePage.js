import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserStatusLoader from './UserStatusLoader/UserStatusLoader';
import UserLoginRegisterBanner from 'shared/UserLoginRegisterBanner/UserLoginRegisterBanner';
import Header from './Header/Header';
import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantTypeCards from './RestaurantTypeCards/RestaurantTypeCards';

HomePage.propTypes = {
  loadingMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isLoading: state.currentLoadingStatus.isLoading,
  };
}

export function HomePage({ isLoading }) {
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
          <UserLoginRegisterBanner />
          <Header />
          <RestaurantSearchBar />
          <RestaurantTypeCards />
        </Fragment>
      )}
    </Fragment>
  );
}

export default connect(mapStateToProps)(HomePage);
