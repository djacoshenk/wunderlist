import React from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {
  submit: PropTypes.func,
  change: PropTypes.func,
  searchParams: PropTypes.objectOf(PropTypes.string),
};

export default function Search({ submit, change, searchParams }) {
  function handleChange(e) {
    e.preventDefault();

    let { name, value } = e.target;

    change(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    submit();
  }

  return (
    <div className='search-container'>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor='term'>
          <div className='term-label'>Find</div>
          <input
            type='text'
            id='term'
            name='term'
            placeholder='pizza, sushi, cocktail bar...'
            value={searchParams.term}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='location'>
          <div className='location-label'>Near</div>
          <input
            type='text'
            id='location'
            name='location'
            placeholder='Los Angeles, CA'
            value={searchParams.location}
            onChange={handleChange}
          />
        </label>
        <button>
          <i className='fas fa-search'></i>
        </button>
      </form>
    </div>
  );
}
