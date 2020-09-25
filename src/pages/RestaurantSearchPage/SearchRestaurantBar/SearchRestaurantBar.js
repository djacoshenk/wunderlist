import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './SearchRestaurantBar.scss';

SearchRestaurantBar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  searchParams: PropTypes.objectOf(PropTypes.string),
};

const b = block('RestaurantSearchPage');

export default function SearchRestaurantBar({
  handleSubmit,
  handleChange,
  searchParams,
}) {
  function change(e) {
    e.preventDefault();

    let { name, value } = e.target;

    handleChange(name, value);
  }

  function submit(e) {
    e.preventDefault();

    handleSubmit();
  }

  return (
    <div className={b('search-bar-container')}>
      <form className={b('search-bar-form')} onSubmit={submit}>
        <label htmlFor='term'>
          <div>Find</div>
          <input
            type='text'
            id='term'
            name='term'
            placeholder='pizza, sushi, cocktail bar...'
            value={searchParams.term}
            onChange={change}
          />
        </label>
        <label htmlFor='location'>
          <div>Near</div>
          <input
            type='text'
            id='location'
            name='location'
            placeholder='Los Angeles, CA'
            value={searchParams.location}
            onChange={change}
          />
        </label>
        <button>
          <i className='fas fa-search'></i>
        </button>
      </form>
    </div>
  );
}
