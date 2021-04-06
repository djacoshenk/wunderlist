import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { auth } from 'setupFirebase';

import UserLoginPage from './UserLoginPage';

import store from 'store/index';

jest.mock('setupFirebase');

const mockedAuth = auth as jest.Mocked<typeof auth>;

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

test('user submits form without filling out fields', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginPage />
      </BrowserRouter>
    </Provider>
  );

  mockedAuth.signInWithEmailAndPassword.mockRejectedValue({
    code: 'auth/invalid-email',
  });

  // user clicks on login button
  userEvent.click(screen.getByRole('button', { name: /login/i }));

  // error message should appear
  await waitFor(() => {
    expect(
      screen.getByRole('alert', { name: /email error/i })
    ).toBeInTheDocument();
  });
});

test('user is not registered and submits form', async () => {
  const fakeUserData = {
    email: 'daniel.jacoshenk@gmail.com',
    password: 'password',
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginPage />
      </BrowserRouter>
    </Provider>
  );

  mockedAuth.signInWithEmailAndPassword.mockRejectedValue({
    code: 'auth/user-not-found',
  });

  // unregistered user fills in fields
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserData.email
  );
  userEvent.type(
    screen.getByPlaceholderText(/password/i),
    fakeUserData.password
  );

  // unregistered user submits form
  userEvent.click(screen.getByRole('button', { name: /login/i }));

  // error message should appear
  await waitFor(() => {
    expect(
      screen.getByRole('alert', { name: /email error/i })
    ).toBeInTheDocument();
  });
});

test('user is registered and submits form with wrong password', async () => {
  const fakeUserData = {
    email: 'daniel.jacoshenk@gmail.com',
    password: 'password',
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginPage />
      </BrowserRouter>
    </Provider>
  );

  mockedAuth.signInWithEmailAndPassword.mockRejectedValue({
    code: 'auth/wrong-password',
  });

  // unregistered user fills in fields
  userEvent.type(screen.getByPlaceholderText(/email/i), fakeUserData.email);
  userEvent.type(
    screen.getByPlaceholderText(/password/i),
    fakeUserData.password
  );

  // unregistered user submits form
  userEvent.click(screen.getByRole('button', { name: /login/i }));

  // username error not should appear
  expect(screen.queryByRole('alert', { name: /email error/i })).toBeNull();

  // password error should appear
  await waitFor(() => {
    expect(
      screen.getByRole('alert', { name: /password error/i })
    ).toBeInTheDocument();
  });
});

test('user is registered and submits form with correct inputs', async () => {
  jest.useFakeTimers();

  const history = createMemoryHistory();

  history.push('/login');

  const fakeRegisteredUser = {
    email: 'daniel.jacoshenk@gmail.com',
    password: 'password123!',
  };

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserLoginPage />
      </Router>
    </Provider>
  );

  // current page should be login page
  expect(history.location.pathname).toBe('/login');

  mockedAuth.signInWithEmailAndPassword.mockResolvedValue({
    user: {
      uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
    },
  } as any);

  // unregistered user fills in fields
  userEvent.type(
    screen.getByPlaceholderText(/email/i),
    fakeRegisteredUser.email
  );
  userEvent.type(
    screen.getByPlaceholderText(/password/i),
    fakeRegisteredUser.password
  );

  // unregistered user submits form
  userEvent.click(screen.getByRole('button', { name: /login/i }));

  jest.advanceTimersByTime(4000);

  // user is routed to the home page
  await waitFor(() => {
    expect(history.location.pathname).toBe('/');
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
