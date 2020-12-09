import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

function Header() {
  return (
    <div className={styles['header-container']}>
      <h1>
        <Link to='/' className={styles['header-link']}>
          Wunderlist
        </Link>
      </h1>
    </div>
  );
}

export default React.memo(Header);
