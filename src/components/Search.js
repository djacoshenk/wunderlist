import React, { useState } from 'react';

export default function Search({ searchPlaces }) {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    searchPlaces(text);

    setText('');
  }

  return (
    <div className='search-container'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='text'
          placeholder='e.g. los angeles'
          value={text}
          onChange={handleChange}
        />
        <button>
          <i className='fas fa-search'></i>
        </button>
      </form>
    </div>
  );
}
