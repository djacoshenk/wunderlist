import React from 'react';

export default function Search({ handleSubmit, handleChange, term, location }) {
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
            value={term}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='location'>
          <div className='location-label'>Near</div>
          <input
            type='text'
            id='location'
            name='location'
            placeholder='los angeles, ca'
            value={location}
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
