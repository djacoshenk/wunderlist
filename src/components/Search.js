import React from 'react';

export default function Search({ handleChange, handleSubmit, term, location }) {
  return (
    <div className='search-container'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='term'
          placeholder='what'
          value={term}
          onChange={handleChange}
        />
        <input
          type='text'
          name='location'
          placeholder='where'
          value={location}
          onChange={handleChange}
        />
        <button>
          <i className='fas fa-search'></i>
        </button>
      </form>
    </div>
  );
}
