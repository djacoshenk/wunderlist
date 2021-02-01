import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import HamburgerMenuButton from './HamburgerMenuButton';

import store from 'store/index';

afterEach(() => {
  cleanup();

  localStorage.clear();
});

test('without a current user, the login and register buttons render', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <HamburgerMenuButton />
      </BrowserRouter>
    </Provider>
  );

  expect(
    screen.getByRole('button', { name: /open menu/i })
  ).toBeInTheDocument();

  // user clicks on hamburger button to show login and register buttons
  userEvent.click(screen.getByRole('button', { name: /open menu/i }));

  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /close menu/i })
  ).toBeInTheDocument();
});
