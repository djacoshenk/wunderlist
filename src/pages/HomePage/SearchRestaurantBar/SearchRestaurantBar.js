import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import block from 'bem-cn';

import './SearchRestaurantBar.scss';

const b = block('HomePage');

export default function SearchRestaurantBar() {
  const [searchParams, setSearchParams] = useState({
    term: '',
    location: 'Los Angeles, CA',
  });
  const history = useHistory();
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

    history.push(`/search/${term}/${location}`);
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
