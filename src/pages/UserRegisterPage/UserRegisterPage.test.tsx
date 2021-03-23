import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { auth, firestore } from 'setupFirebase';

import UserRegisterPage from './UserRegisterPage';

import store from 'store/index';

jest.mock('setupFirebase');

const mockedAuth = auth as jest.Mocked<typeof auth>;
const mockedFirestore = firestore as jest.Mocked<typeof firestore>;

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
    screen.getByRole('alert', { name: /^(password error)/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /^(confirm password error)$/i })
  ).toBeInTheDocument();

  // user should remain on the register page
  expect(history.location.pathname).toBe('/register');
});

test('user types into form fields and submits form', async () => {
  jest.useFakeTimers();

  const history = createMemoryHistory();

  // set current page to register page
  history.push('/register');

  const fakeUserData = {
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    email: 'hello@dannyjaco.me',
    password: 'password',
    confirmPassword: 'password',
  };

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserRegisterPage />
      </Router>
    </Provider>
  );

  mockedAuth.createUserWithEmailAndPassword.mockResolvedValue({
    user: {
      uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
    },
  } as any);

  mockedFirestore.collection.mockImplementation(() => {
    return {
      doc: () => {
        return {
          set: jest.fn(),
        };
      },
    } as any;
  });

  mockedAuth.onAuthStateChanged.mockImplementation(() => {
    return {} as any;
  });

  // current page should be register page
  expect(history.location.pathname).toBe('/register');

  // user types into first name field
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    fakeUserData.firstName
  );
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
    fakeUserData.firstName
  );

  // user types into last name field
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    fakeUserData.lastName
  );
  expect(screen.getByRole('textbox', { name: /last name/i })).toHaveValue(
    fakeUserData.lastName
  );

  // user types into email field
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserData.email
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
    fakeUserData.email
  );

  // user types into password field
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 6 characters)'),
    fakeUserData.password
  );
  expect(
    screen.getByPlaceholderText('Password (min. 6 characters)')
  ).toHaveValue(fakeUserData.password);

  // user types into confirm password field
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserData.confirmPassword
  );
  expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue(
    fakeUserData.confirmPassword
  );

  // user submits form
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  jest.advanceTimersByTime(3000);

  // error messages should not render
  expect(screen.queryByRole('alert', { name: /first name error/i })).toBeNull();
  expect(screen.queryByRole('alert', { name: /last name error/i })).toBeNull();
  expect(screen.queryByRole('alert', { name: /email error/i })).toBeNull();
  expect(
    screen.queryByRole('alert', { name: /^(password error)/i })
  ).toBeNull();
  expect(
    screen.queryByRole('alert', { name: /^(confirm password error)$/i })
  ).toBeNull();

  // user should be routed to the home page
  await waitFor(() => {
    expect(history.location.pathname).toBe('/');
  });
});

test('user submits form with invalid email', async () => {
  const fakeUserData = {
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    email: 'hello',
    password: 'password',
    confirmPassword: 'password',
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  mockedAuth.createUserWithEmailAndPassword.mockRejectedValue({
    code: 'auth/invalid-email',
  });

  // user types into first name field
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    fakeUserData.firstName
  );
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
    fakeUserData.firstName
  );

  // user types into last name field
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    fakeUserData.lastName
  );
  expect(screen.getByRole('textbox', { name: /last name/i })).toHaveValue(
    fakeUserData.lastName
  );

  // user types into email field
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserData.email
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
    fakeUserData.email
  );

  // user types into password field
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 6 characters)'),
    fakeUserData.password
  );
  expect(
    screen.getByPlaceholderText('Password (min. 6 characters)')
  ).toHaveValue(fakeUserData.password);

  // user types into confirm password field
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserData.confirmPassword
  );
  expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue(
    fakeUserData.confirmPassword
  );

  // user submits form
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  // error message should appear
  await waitFor(() =>
    expect(
      screen.getByRole('alert', { name: /email error/i })
    ).toBeInTheDocument()
  );
});

test('user submits form with previously registered email', async () => {
  const fakeUserData = {
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    email: 'daniel.jacoshenk@gmail',
    password: 'password',
    confirmPassword: 'password',
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  mockedAuth.createUserWithEmailAndPassword.mockRejectedValue({
    code: 'auth/email-already-in-use',
  });

  // user types into first name field
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    fakeUserData.firstName
  );
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
    fakeUserData.firstName
  );

  // user types into last name field
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    fakeUserData.lastName
  );
  expect(screen.getByRole('textbox', { name: /last name/i })).toHaveValue(
    fakeUserData.lastName
  );

  // user types into email field
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserData.email
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
    fakeUserData.email
  );

  // user types into password field
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 6 characters)'),
    fakeUserData.password
  );
  expect(
    screen.getByPlaceholderText('Password (min. 6 characters)')
  ).toHaveValue(fakeUserData.password);

  // user types into confirm password field
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserData.confirmPassword
  );
  expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue(
    fakeUserData.confirmPassword
  );

  // user submits form
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  // error message should appear
  await waitFor(() =>
    expect(
      screen.getByRole('alert', { name: /email error/i })
    ).toBeInTheDocument()
  );
});

test('user submits a password less than 6 characters in length', async () => {
  const fakeUserData = {
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    email: 'hello@dannyjaco.me',
    password: 'pass',
    confirmPassword: 'pass',
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  mockedAuth.createUserWithEmailAndPassword.mockRejectedValue({
    code: 'auth/weak-password',
  });

  // user types into first name field
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    fakeUserData.firstName
  );
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
    fakeUserData.firstName
  );

  // user types into last name field
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    fakeUserData.lastName
  );
  expect(screen.getByRole('textbox', { name: /last name/i })).toHaveValue(
    fakeUserData.lastName
  );

  // user types into email field
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserData.email
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
    fakeUserData.email
  );

  // user types into password field
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 6 characters)'),
    fakeUserData.password
  );
  expect(
    screen.getByPlaceholderText('Password (min. 6 characters)')
  ).toHaveValue(fakeUserData.password);

  // user types into confirm password field
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserData.confirmPassword
  );
  expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue(
    fakeUserData.confirmPassword
  );

  // user submits form
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  // error message should appear
  await waitFor(() => {
    expect(
      screen.getByRole('alert', { name: /^(password error)$/i })
    ).toBeInTheDocument();
  });
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
    screen.getByPlaceholderText('Password (min. 6 characters)'),
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
