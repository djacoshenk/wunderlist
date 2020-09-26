import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export default function Header() {
  return (
    <div className='header-container'>
      <h1>
        <Link to='/search' className='header-link'>
          wunderlist
        </Link>
      </h1>
    </div>
  );
}
