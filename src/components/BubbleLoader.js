import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

IsLoading.propTypes = {
  searchParams: PropTypes.objectOf(PropTypes.string),
};

export default function IsLoading({ searchParams }) {
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
