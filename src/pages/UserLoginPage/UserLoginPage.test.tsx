import { render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import UserLoginPage from './UserLoginPage';

import store from 'store/index';

const mockedLocalStorage = localStorage as jest.Mocked<typeof localStorage>;

test('component is accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginPage />
      </BrowserRouter>
    </Provider>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('component renders with title', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginPage />
      </BrowserRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(document.title).toBe('wunderlist - User Login');
  });
});

test('user submits form without filling out fields', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginPage />
      </BrowserRouter>
    </Provider>
  );

  // login button should be rendered
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

  // user clicks on login button
  userEvent.click(screen.getByRole('button', { name: /login/i }));

  // error messages should appear
  expect(
    screen.getByRole('alert', { name: /username error/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /password error/i })
  ).toBeInTheDocument();
});

test('user is not registered and submits form', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginPage />
      </BrowserRouter>
    </Provider>
  );

  // textboxes should be rendered
  expect(
    screen.getByRole('textbox', { name: /username/i })
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

  // unregistered user fills in fields
  userEvent.type(
    screen.getByRole('textbox', { name: /username/i }),
    'djacoshenk'
  );
  userEvent.type(screen.getByPlaceholderText(/password/i), 'password123!');

  // unregistered user submits form
  userEvent.click(screen.getByRole('button', { name: /login/i }));

  // error messages should appear
  expect(
    screen.getByRole('alert', { name: /username error/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /password error/i })
  ).toBeInTheDocument();
});

test('user is registered and submits form with wrong password', () => {
  const fakeRegisteredUser = [
    {
      username: 'djacoshenk',
      password: 'password123!',
    },
  ];

  mockedLocalStorage.getItem.mockReturnValue(
    JSON.stringify(fakeRegisteredUser)
  );

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginPage />
      </BrowserRouter>
    </Provider>
  );

  // textboxes should be rendered
  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

  // unregistered user fills in fields
  userEvent.type(screen.getByPlaceholderText(/username/i), 'djacoshenk');
  userEvent.type(screen.getByPlaceholderText(/password/i), 'password');

  // unregistered user submits form
  userEvent.click(screen.getByRole('button', { name: /login/i }));

  // username error not should appear
  expect(screen.queryByRole('alert', { name: /username error/i })).toBeNull();

  // password error should appear
  expect(
    screen.getByRole('alert', { name: /password error/i })
  ).toBeInTheDocument();
});

test('user is registered and submits form with correct inputs', () => {
  jest.useFakeTimers();

  const history = createMemoryHistory();

  history.push('/login');

  const fakeRegisteredUser = [
    {
      username: 'djacoshenk',
      password: 'password123!',
    },
  ];

  mockedLocalStorage.getItem.mockReturnValue(
    JSON.stringify(fakeRegisteredUser)
  );

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserLoginPage />
      </Router>
    </Provider>
  );

  // textboxes should be rendered
  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

  // unregistered user fills in fields
  userEvent.type(screen.getByPlaceholderText(/username/i), 'djacoshenk');
  userEvent.type(screen.getByPlaceholderText(/password/i), 'password123!');

  // current page should be login page
  expect(history.location.pathname).toBe('/login');

  // unregistered user submits form
  userEvent.click(screen.getByRole('button', { name: /login/i }));

  // user is routed to the home page
  expect(history.location.pathname).toBe('/');

  act(() => {
    jest.advanceTimersByTime(2000);
  });
});

test('user clicks on header to go back to the home page', () => {
  const history = createMemoryHistory();

  history.push('/login');

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserLoginPage />
      </Router>
    </Provider>
  );

  // expect header link to be rendered
  expect(screen.getByRole('link', { name: /globe/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole('link', { name: /globe/i }));

  expect(history.location.pathname).toBe('/');
});
