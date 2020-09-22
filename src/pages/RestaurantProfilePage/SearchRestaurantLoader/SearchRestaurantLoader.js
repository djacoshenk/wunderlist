import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './SearchRestaurantLoader.scss';

SearchRestaurantLoader.propTypes = {
  searchParams: PropTypes.objectOf(PropTypes.string),
};

export default function SearchRestaurantLoader({ searchParams }) {
  return (
    <Fragment>
      <div className='main-loader'>
        <h3>
          Finding you the best {searchParams.term} in {searchParams.location}
        </h3>
        <div className='bubble-loader'>
          <div className='bubble'></div>
          <div className='bubble'></div>
          <div className='bubble'></div>
        </div>
      </div>
    </Fragment>
  );
}
