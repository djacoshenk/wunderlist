import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import UserRegisterPage from './UserRegisterPage';

import store from 'store/index';

const mockedLocalStorage = localStorage as jest.Mocked<typeof localStorage>;

test('component is accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
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
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(document.title).toBe('wunderlist - User Registration');
  });
});

test('user submits form without filling out fields', () => {
  const history = createMemoryHistory();

  // set current page to register page
  history.push('/register');

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserRegisterPage />
      </Router>
    </Provider>
  );

  // register button should be rendered
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

  // user clicks on register button without filling in fields
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  // error messages should appear
  expect(
    screen.getByRole('alert', { name: /first name error/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /last name error/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /email error/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /username error/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /^(password error)/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /^(confirm password error)$/i })
  ).toBeInTheDocument();

  // user should remain on the register page
  expect(history.location.pathname).toBe('/register');
});

test('user types into form fields and submits form', () => {
  jest.useFakeTimers();

  const history = createMemoryHistory();

  // set current page to register page
  history.push('/register');

  const fakeUserData = {
    first_name: 'Danny',
    last_name: 'Jacoshenk',
    email: 'daniel.jacoshenk@gmail.com',
    username: 'djacoshenk',
    password: 'password123!',
    confirm_password: 'password123!',
  };

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserRegisterPage />
      </Router>
    </Provider>
  );

  // current page should be register page
  expect(history.location.pathname).toBe('/register');

  // input fields should be rendered
  expect(
    screen.getByRole('textbox', { name: /first name/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('textbox', { name: /last name/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  expect(
    screen.getByRole('textbox', { name: /username/i })
  ).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('Password (min. 10 characters)')
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();

  // user types into first name field
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    fakeUserData.first_name
  );
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
    fakeUserData.first_name
  );

  // user types into last name field
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    fakeUserData.last_name
  );
  expect(screen.getByRole('textbox', { name: /last name/i })).toHaveValue(
    fakeUserData.last_name
  );

  // user types into email field
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserData.email
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
    fakeUserData.email
  );

  // user types into username field
  userEvent.type(
    screen.getByRole('textbox', { name: /username/i }),
    fakeUserData.username
  );
  expect(screen.getByRole('textbox', { name: /username/i })).toHaveValue(
    fakeUserData.username
  );

  // user types into password field
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 10 characters)'),
    fakeUserData.password
  );
  expect(
    screen.getByPlaceholderText('Password (min. 10 characters)')
  ).toHaveValue(fakeUserData.password);

  // user types into confirm password field
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserData.confirm_password
  );
  expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue(
    fakeUserData.confirm_password
  );

  // user submits form
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  jest.advanceTimersByTime(2000);

  // error messages should not render
  expect(screen.queryByRole('alert', { name: /first name error/i })).toBeNull();
  expect(screen.queryByRole('alert', { name: /last name error/i })).toBeNull();
  expect(screen.queryByRole('alert', { name: /email error/i })).toBeNull();
  expect(screen.queryByRole('alert', { name: /username error/i })).toBeNull();
  expect(
    screen.queryByRole('alert', { name: /^(password error)/i })
  ).toBeNull();
  expect(
    screen.queryByRole('alert', { name: /^(confirm password error)$/i })
  ).toBeNull();

  // user should be routed to the home page
  expect(history.location.pathname).toBe('/');
});

test('user submits form with invalid email', () => {
  const fakeUserData = {
    email: 'daniel.jacoshenk',
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  // user types invalid email into form
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserData.email
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
    fakeUserData.email
  );

  // user submits form
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  // error message should appear
  expect(
    screen.getByRole('alert', { name: /email error/i })
  ).toBeInTheDocument();
});

test('user submits a password less than 10 characters in length', () => {
  const fakeUserData = {
    password: 'password',
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  // user types invalid email into form
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 10 characters)'),
    fakeUserData.password
  );
  expect(
    screen.getByPlaceholderText('Password (min. 10 characters)')
  ).toHaveValue(fakeUserData.password);

  // user submits form
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  // error message should appear
  expect(
    screen.getByRole('alert', { name: /^(password error)$/i })
  ).toBeInTheDocument();
});

test('user submits form with non-matching passwords', () => {
  const fakeUserData = {
    password: 'password123!',
    confirm_password: 'password1234!',
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  // user types invalid email into form
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 10 characters)'),
    fakeUserData.password
  );
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserData.confirm_password
  );

  // user submits form
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  // error message should appear
  expect(
    screen.getByRole('alert', { name: /^(password error)$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /^(confirm password error)$/i })
  ).toBeInTheDocument();
});

test('user submits form with already registered email and username', () => {
  const fakeRegisteredUserData = [
    {
      username: 'djacoshenk',
      email: 'daniel.jacoshenk@gmail.com',
    },
  ];

  const fakeUserData = {
    username: 'djacoshenk',
    email: 'daniel.jacoshenk@gmail.com',
  };

  mockedLocalStorage.getItem.mockReturnValue(
    JSON.stringify(fakeRegisteredUserData)
  );

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  // user types registered email and username into fields
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserData.email
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /username/i }),
    fakeUserData.username
  );

  // user submits form
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  // error messages should appear
  expect(
    screen.getByRole('alert', { name: /email error/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /username error/i })
  ).toBeInTheDocument();
});

test('user clicks on header to go back to the home page', () => {
  const history = createMemoryHistory();

  history.push('/register');

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserRegisterPage />
      </Router>
    </Provider>
  );

  // expect header link to be rendered
  expect(screen.getByRole('link', { name: /globe/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole('link', { name: /globe/i }));

  expect(history.location.pathname).toBe('/');
});
