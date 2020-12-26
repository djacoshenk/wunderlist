import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RestaurantLoaderBubbles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles';

import styles from './UserStatusLoader.module.scss';

UserLogoutLoader.propTypes = {
  loadingMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return { loadingMessage: state.currentLoadingStatus.loadingMessage };
}

export function UserLogoutLoader({ loadingMessage }) {
  return (
    <div className={styles['user-status-loader']}>
      <h3>{loadingMessage}</h3>
      <div className={styles['user-status-bubble-loader']}>
        <RestaurantLoaderBubbles />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(UserLogoutLoader);
