import React from 'react';

import globe from 'assets/global.png';
import styles from './Header.module.scss';

function Header() {
  return (
    <div className={styles['header-container']}>
      <img src={globe} alt='blue-green-globe' />
      <h1>wunderlist</h1>
      <h3>find and save your new favorite place</h3>
    </div>
  );
}

export default React.memo(Header);
