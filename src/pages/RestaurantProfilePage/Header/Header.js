import React from 'react';
import { Link } from 'react-router-dom';
import block from 'bem-cn';

import './Header.scss';

const b = block('RestaurantProfilePage');

export default function Header() {
  return (
    <div className={b('header-container')}>
      <h1>
        <Link to='/' className='header-link'>
          wunderlist
        </Link>
      </h1>
    </div>
  );
}
