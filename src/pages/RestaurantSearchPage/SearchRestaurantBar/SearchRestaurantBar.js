import React, { useState } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './SearchRestaurantBar.scss';

const b = block('RestaurantSearchPage');

SearchRestaurantBar.propTypes = {
  params: PropTypes.shape({
    term: PropTypes.string,
    location: PropTypes.string,
  }),
  handleFormSubmit: PropTypes.func,
};

export default function SearchRestaurantBar({ params, handleFormSubmit }) {
  const [searchParams, setSearchParams] = useState({
    term: params.term,
    location: params.location,
  });
  const { term, location } = searchParams;

  function onInputChange(e) {
    e.preventDefault();

    let { name, value } = e.target;

    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function onFormSubmit(e) {
    e.preventDefault();

    handleFormSubmit(term, location);
  }

  return (
    <div className={b('search-bar-container')}>
      <form className={b('search-bar-form')} onSubmit={onFormSubmit}>
        <label htmlFor='term'>
          <div>Find</div>
          <input
            type='text'
            id='term'
            name='term'
            placeholder='pizza, sushi, cocktail bar...'
            value={term}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor='location'>
          <div>Near</div>
          <input
            type='text'
            id='location'
            name='location'
            placeholder='Los Angeles, CA'
            value={location}
            onChange={onInputChange}
          />
        </label>
        <button>
          <i className='fas fa-search'></i>
        </button>
      </form>
    </div>
  );
}
