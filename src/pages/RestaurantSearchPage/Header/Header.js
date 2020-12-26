import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles['header-container']}>
      <h1>
        <Link to='/' className={styles['header-link']}>
          wunderlist
        </Link>
      </h1>
    </div>
  );
}
