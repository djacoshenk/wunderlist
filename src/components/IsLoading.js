import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

IsLoading.propTypes = {
  term: PropTypes.string,
  location: PropTypes.string,
};

export default function IsLoading({ term, location }) {
  return (
    <Fragment>
      <div className='main-loader'>
        <h3>
          Finding you the best {term} in {location}
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
