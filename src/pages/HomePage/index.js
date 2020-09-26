import React from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';

import Header from './Header/Header';

import './styles.scss';

const b = block('HomePage');

export default function HomePage() {
  return (
    <div className={b('home-container')}>
      <Header />
      <Link to='/search'>
        <button>Get Started</button>
      </Link>
    </div>
  );
}
