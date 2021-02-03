import { cleanup, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { axe } from 'jest-axe';

import HamburgerMenuButton from './HamburgerMenuButton';

import store from 'store/index';

afterEach(() => {
  cleanup();

  localStorage.clear();
});

test('login and register buttons are accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <HamburgerMenuButton />
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
        <HamburgerMenuButton />
      </BrowserRouter>
    </Provider>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('without a current user, the login and register buttons render', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <HamburgerMenuButton />
      </BrowserRouter>
    </Provider>
  );

  // open menu button should be rendered
  expect(
    screen.getByRole('button', { name: /open menu/i })
  ).toBeInTheDocument();

  // user clicks on hamburger button to show login and register buttons
  userEvent.click(screen.getByRole('button', { name: /open menu/i }));

  // login button should be rendered
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

  // register button should be rendered
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

  // close menu button should be rendered
  expect(
    screen.getByRole('button', { name: /close menu/i })
  ).toBeInTheDocument();

  // user clicks the close menu button
  userEvent.click(screen.getByRole('button', { name: /close menu/i }));

  // login button should not be rendered
  expect(screen.queryByRole('button', { name: /login/i })).toBeNull();

  // register button should not be rendered
  expect(screen.queryByRole('button', { name: /register/i })).toBeNull();
});

test('login button routes to login page', () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <HamburgerMenuButton />
      </Router>
    </Provider>
  );

  // open menu button should be rendered
  expect(
    screen.getByRole('button', { name: /open menu/i })
  ).toBeInTheDocument();

  // user clicks on hamburger button to show login button
  userEvent.click(screen.getByRole('button', { name: /open menu/i }));

  // login button should be rendered
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

  // user clicks on login button
  userEvent.click(screen.getByRole('button', { name: /login/i }));

  // user is routed to the login page
  expect(history.location.pathname).toBe('/login');
});

test('register button routes to register page', () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <HamburgerMenuButton />
      </Router>
    </Provider>
  );

  // open menu button should be rendered
  expect(
    screen.getByRole('button', { name: /open menu/i })
  ).toBeInTheDocument();

  // user clicks on hamburger button to show register button
  userEvent.click(screen.getByRole('button', { name: /open menu/i }));

  // register button should be rendered
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

  // user clicks on register button
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  // user is routed to the register page
  expect(history.location.pathname).toBe('/register');
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
        <HamburgerMenuButton />
      </BrowserRouter>
    </Provider>
  );

  // open menu button should be rendered
  expect(
    screen.getByRole('button', { name: /open menu/i })
  ).toBeInTheDocument();

  // user clicks on hamburger button to show logout button
  userEvent.click(screen.getByRole('button', { name: /open menu/i }));

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
  userEvent.click(screen.getByRole('button', { name: /toggle menu/i }));

  // logout button should be rendered
  expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();

  // user clicks on chevron button to hide close menu
  userEvent.click(screen.getByRole('button', { name: /toggle menu/i }));

  act(() => {
    jest.advanceTimersByTime(100);
  });

  // logout button should not be rendered
  expect(screen.queryByRole('button', { name: /logout/i })).toBeNull();

  // user clicks the chevron button to close the menu
  userEvent.click(screen.getByRole('button', { name: /close menu/i }));

  // logout button should not be rendered
  expect(screen.queryByRole('button', { name: /logout/i })).toBeNull();
});

test('logout button routes to home page', () => {
  jest.useFakeTimers();

  const history = createMemoryHistory();

  const fakeUserData = [
    {
      first_name: 'Danny',
      username: 'djacoshenk',
    },
  ];

  localStorage.setItem('currentUser', JSON.stringify(fakeUserData));

  render(
    <Provider store={store}>
      <Router history={history}>
        <HamburgerMenuButton />
      </Router>
    </Provider>
  );

  // open menu button should be rendered
  expect(
    screen.getByRole('button', { name: /open menu/i })
  ).toBeInTheDocument();

  // user clicks on hamburger button to show logout button
  userEvent.click(screen.getByRole('button', { name: /open menu/i }));

  // chevron button should be rendered
  expect(
    screen.getByRole('button', { name: /open menu/i })
  ).toBeInTheDocument();

  // clicking on the chevron button should open the menu and show logout button
  userEvent.click(screen.getByRole('button', { name: /toggle menu/i }));

  // logout button should be rendered
  expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();

  // user clicks on the logout button
  userEvent.click(screen.getByRole('button', { name: /logout/i }));

  jest.advanceTimersByTime(2000);
});
