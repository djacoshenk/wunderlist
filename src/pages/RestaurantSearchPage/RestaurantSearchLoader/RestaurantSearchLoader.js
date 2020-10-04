import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import RestaurantSearchLoaderBubbles from '../RestaurantSearchLoaderBubbles/RestaurantSearchLoaderBubbles';

import './RestaurantSearchLoader.scss';

SearchRestaurantLoader.propTypes = {
  term: PropTypes.string,
  location: PropTypes.string,
};

const b = block('RestaurantSearchPage');

export default function SearchRestaurantLoader({ term, location }) {
  return (
    <Fragment>
      <div className={b('main-content-loader')}>
        <h3>
          Finding you the best {term} in {location}
        </h3>
        <div className={b('main-content-bubble-loader')}>
          <RestaurantSearchLoaderBubbles />
        </div>
      </div>
    </Fragment>
  );
}
