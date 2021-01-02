import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useHistory } from 'react-router-dom';

import './HamburgerMenuButton.css';

export default function HamburgerMenuButton() {
  const history = useHistory();

  return (
    <div className='menu-button-container'>
      <Menu right width={200}>
        <button
          name='login-btn'
          type='button'
          onClick={() => history.push('/login')}
        >
          LOGIN
        </button>
        <button
          name='register-btn'
          type='button'
          onClick={() => history.push('/register')}
        >
          REGISTER
        </button>
      </Menu>
    </div>
  );
}
