import { cleanup, render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import UserLoginRegisterBanner from './UserLoginRegisterBanner';

import store from 'store/index';

afterEach(() => {
  cleanup();

  localStorage.clear();
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

test('logout buttons are accessible', async () => {
  const fakeUserData = [
    {
      first_name: 'Danny',
      username: 'djacoshenk',
    },
  ];

  localStorage.setItem('currentUser', JSON.stringify(fakeUserData));

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

test('without a current user, login and register buttons render', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginRegisterBanner />
      </BrowserRouter>
    </Provider>
  );

  // login button should be rendered
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

  // register button should be rendered
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

  // logout button should not be rendered
  expect(screen.queryByRole('button', { name: /logout/i })).toBeNull();
});

test('with a current user, logout button renders', () => {
  jest.useFakeTimers();

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
    screen.getByRole('button', { name: /toggle menu/i })
  ).toBeInTheDocument();

  // logout button should not be rendered
  expect(screen.queryByRole('button', { name: /logout/i })).toBeNull();

  // clicking on the chevron button should open the menu and show logout button
  userEvent.click(screen.getByRole('button', { name: /toggle menu/i }));

  // logout button should be rendered
  expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();

  // user clicks the chevron button to close the menu
  userEvent.click(screen.getByRole('button', { name: /toggle menu/i }));

  act(() => {
    jest.advanceTimersByTime(100);
  });

  // logout button should not be rendered
  expect(screen.queryByRole('button', { name: /logout/i })).toBeNull();
});

test('login button routes to login page', () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserLoginRegisterBanner />
      </Router>
    </Provider>
  );

  // login button should be rendered
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

  // user clicks on login button
  userEvent.click(screen.getByRole('button', { name: /login/i }));

  // user should be routed to the login page
  expect(history.location.pathname).toBe('/login');
});

test('register button routes to register page', () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserLoginRegisterBanner />
      </Router>
    </Provider>
  );

  // register button should be rendered
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

  // user clicks on register button
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  // user should be routed to the register page
  expect(history.location.pathname).toBe('/register');
});

test('logout button routes to home page', () => {
  jest.useFakeTimers();

  const history = createMemoryHistory();

  const fakeCurrentUserData = [
    {
      first_name: 'Danny',
      username: 'djacoshenk',
    },
  ];

  const fakeRegisteredUserData = [
    {
      first_name: 'Danny',
      username: 'djacoshenk',
    },
    {
      first_name: 'JP',
      username: 'jpsio',
    },
  ];

  localStorage.setItem('currentUser', JSON.stringify(fakeCurrentUserData));
  localStorage.setItem(
    'registeredUsers',
    JSON.stringify(fakeRegisteredUserData)
  );

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserLoginRegisterBanner />
      </Router>
    </Provider>
  );

  // chevron button should be rendered
  expect(
    screen.getByRole('button', { name: /toggle menu/i })
  ).toBeInTheDocument();

  // clicking on the chevron button should open the menu and show logout button
  userEvent.click(screen.getByRole('button', { name: /toggle menu/i }));

  // logout button should be rendered
  expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();

  // user clicks on logout button
  userEvent.click(screen.getByRole('button', { name: /logout/i }));

  jest.advanceTimersByTime(2000);
});
