import React from 'react';
import { Link } from 'react-router-dom';

import UserLoginRegisterBanner from 'shared/UserLoginRegisterBanner/UserLoginRegisterBanner';

import globe from 'assets/global.png';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles['header-container']}>
      <Link to='/' className={styles['header-link-img']}>
        <img src={globe} alt='blue-green-globe' />
      </Link>
      <UserLoginRegisterBanner />
    </div>
  );
}
