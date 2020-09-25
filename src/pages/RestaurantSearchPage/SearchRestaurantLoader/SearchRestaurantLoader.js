import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import SearchRestaurantLoaderBubbles from '../SearchRestaurantLoaderBubbles/SearchRestaurantLoaderBubbles';

import './SearchRestaurantLoader.scss';

SearchRestaurantLoader.propTypes = {
  searchParams: PropTypes.objectOf(PropTypes.string),
};

const b = block('RestaurantSearchPage');

export default function SearchRestaurantLoader({ searchParams }) {
  return (
    <Fragment>
      <div className={b('main-content-loader')}>
        <h3>
          Finding you the best {searchParams.term} in {searchParams.location}
        </h3>
        <div className={b('main-content-bubble-loader')}>
          <SearchRestaurantLoaderBubbles />
        </div>
      </div>
    </Fragment>
  );
}
