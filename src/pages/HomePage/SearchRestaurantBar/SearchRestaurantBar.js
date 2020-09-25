import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './SearchRestaurantBar.scss';

SearchRestaurantBar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  searchParams: PropTypes.objectOf(PropTypes.string),
};

const b = block('HomePage');

export default function SearchRestaurantBar() {
  return (
    <div className={b('search-bar-container')}>
      <form className={b('search-bar-form')}>
        <label htmlFor='term'>
          <div>Find</div>
          <input
            type='text'
            id='term'
            name='term'
            placeholder='pizza, sushi, cocktail bar...'
          />
        </label>
        <label htmlFor='location'>
          <div>Near</div>
          <input
            type='text'
            id='location'
            name='location'
            placeholder='Los Angeles, CA'
          />
        </label>
        <button>
          <i className='fas fa-search'></i>
        </button>
      </form>
    </div>
  );
}
