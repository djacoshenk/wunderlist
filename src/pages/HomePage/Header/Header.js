import React from 'react';
import { block } from 'bem-cn';

import globe from '../../../assets/global.png';

import './Header.scss';

const b = block('HomePage');

export default function Header() {
  return (
    <div className={b('header-container')}>
      <img src={globe} alt='blue-green-globe' />
      <h1>wunderlist</h1>
      <h3>find, save, and share your new favorite place</h3>
    </div>
  );
}
