import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import block from 'bem-cn';

import './RestaurantSearchBar.scss';

const b = block('RestaurantSearchPage');

export default function SearchRestaurantBar() {
  const history = useHistory();
  const [searchParams, setSearchParams] = useState({
    term: '',
    location: '',
  });

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

    let { term, location } = searchParams;

    term = formatForUrl(term);
    location = formatForUrl(location);

    history.push(`/search/${term}/${location}`);
  }

  // after form submit, format the param for the URL
  function formatForUrl(param) {
    return param
      .toLowerCase()
      .split('')
      .filter((val) => val !== ',')
      .map((val) => (val === ' ' ? '-' : val))
      .join('');
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
            value={searchParams.term}
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
            value={searchParams.location}
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
