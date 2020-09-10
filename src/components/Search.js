import React, { useState } from 'react';

const defaultParams = {
  term: '',
  location: '',
};

export default function Search({ searchPlaces }) {
  const [params, setParams] = useState(defaultParams);

  function handleChange(e) {
    let { name, value } = e.target;

    setParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let { term, location } = params;

    searchPlaces(term, location);

    setParams((prevState) => ({
      ...prevState,
      ...defaultParams,
    }));
  }

  return (
    <div className='search-container'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='term'
          placeholder='sushi, pizza, cocktail bar...'
          value={params.term}
          onChange={handleChange}
        />
        <input
          type='text'
          name='location'
          placeholder='city'
          value={params.location}
          onChange={handleChange}
        />
        <button>
          <i className='fas fa-search'></i>
        </button>
      </form>
    </div>
  );
}
