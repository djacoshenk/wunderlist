import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import UserLoginRegisterBanner from './UserLoginRegisterBanner';

import store from 'store/index';

afterEach(() => {
  cleanup();

  localStorage.clear();
});

test('without a current user, login and register buttons render', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginRegisterBanner />
      </BrowserRouter>
    </Provider>
  );

  // login button should be rendered
  expect(screen.queryByRole('button', { name: /login/i })).toBeInTheDocument();

  // register button should be rendered
  expect(
    screen.queryByRole('button', { name: /register/i })
  ).toBeInTheDocument();

  // logout button should not be rendered
  expect(screen.queryByRole('button', { name: /logout/i })).toBeNull();
});

test('login and register buttons are accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginRegisterBanner />
      </BrowserRouter>
    </Provider>
  );
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('with a current user, logout button renders', () => {
  const fakeUserData = [
    {
      first_name: 'Danny',
      username: 'djacoshenk',
    },
  ];

  localStorage.setItem('currentUser', JSON.stringify(fakeUserData));

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginRegisterBanner />
      </BrowserRouter>
    </Provider>
  );

  // name should be rendered as link
  expect(
    screen.getByRole('link', { name: fakeUserData[0].first_name })
  ).toBeInTheDocument();

  // chevron button should be rendered
  expect(
    screen.getByRole('button', { name: /open menu/i })
  ).toBeInTheDocument();

  // logout button should not be rendered
  expect(screen.queryByRole('button', { name: /logout/i })).toBeNull();

  // clicking on the chevron button should open the menu and show logout button
  userEvent.click(screen.getByRole('button', { name: /open menu/i }));

  // logout button should be rendered
  expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
});

test('logout buttons are accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginRegisterBanner />
      </BrowserRouter>
    </Provider>
  );
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
