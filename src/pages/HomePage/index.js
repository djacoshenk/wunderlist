import React, { useState } from 'react';
import Header from './Header/Header';
import SearchRestaurantBar from './SearchRestaurantBar/SearchRestaurantBar';

import './styles.scss';

export default function HomePage() {
  const [searchParams, setSearchParams] = useState({
    term: '',
    location: 'Los Angeles, CA',
  });

  function handleChange(name, value) {
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className='home-container'>
      <Header />
      <SearchRestaurantBar
        searchParams={searchParams}
        handleChange={handleChange}
      />
    </div>
  );
}
