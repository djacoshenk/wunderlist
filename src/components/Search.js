import React, { useState } from 'react';

export default function Search({ searchPlaces }) {
  const [params, setParams] = useState({ term: '', location: '' });

  function handleChange(e) {
    let { name, value } = e.target;

    setParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    searchPlaces(params);

    setParams((prevState) => ({
      ...prevState,
      term: '',
      location: '',
    }));
  }

  return (
    <div className='search-container'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='term'
          placeholder='what'
          value={params.term}
          onChange={handleChange}
        />
        <input
          type='text'
          name='location'
          placeholder='where'
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
