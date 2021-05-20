import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { axe } from 'jest-axe';
import { when, resetAllWhenMocks } from 'jest-when';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';

import UserRegisterPage from 'pages/UserRegisterPage/UserRegisterPage';
import store from 'store/store';
import { auth, firestore } from 'setupFirebase';

jest.mock('setupFirebase');

const mockedAuth = auth as jest.Mocked<typeof auth>;
const mockedFirestore = firestore as jest.Mocked<typeof firestore>;

beforeEach(() => {
  resetAllWhenMocks();
});

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

  const fakeUserLoginData = {
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    email: 'hello@dannyjaco.me',
    password: 'password',
    confirmPassword: 'password',
  };

  when(mockedAuth.createUserWithEmailAndPassword)
    .calledWith(fakeUserLoginData.email, fakeUserLoginData.password)
    .mockResolvedValue({
      user: {
        uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
      },
    } as any);

  when(mockedFirestore.collection)
    .calledWith('users')
    .mockImplementation(() => {
      return {
        doc: () => {
          return {
            set: jest.fn(),
          };
        },
      } as any;
    });

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserRegisterPage />
      </Router>
    </Provider>
  );

  // current page should be register page
  expect(history.location.pathname).toBe('/register');

  // user types into first name field
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    fakeUserLoginData.firstName
  );
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
    fakeUserLoginData.firstName
  );

  // user types into last name field
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    fakeUserLoginData.lastName
  );
  expect(screen.getByRole('textbox', { name: /last name/i })).toHaveValue(
    fakeUserLoginData.lastName
  );

  // user types into email field
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserLoginData.email
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
    fakeUserLoginData.email
  );

  // user types into password field
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 6 characters)'),
    fakeUserLoginData.password
  );
  expect(
    screen.getByPlaceholderText('Password (min. 6 characters)')
  ).toHaveValue(fakeUserLoginData.password);

  // user types into confirm password field
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserLoginData.confirmPassword
  );
  expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue(
    fakeUserLoginData.confirmPassword
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
  const fakeUserLoginData = {
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    email: 'hello',
    password: 'password',
    confirmPassword: 'password',
  };

  when(mockedAuth.createUserWithEmailAndPassword)
    .calledWith(fakeUserLoginData.email, fakeUserLoginData.password)
    .mockRejectedValue({
      code: 'auth/invalid-email',
    });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  // user types into first name field
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    fakeUserLoginData.firstName
  );
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
    fakeUserLoginData.firstName
  );

  // user types into last name field
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    fakeUserLoginData.lastName
  );
  expect(screen.getByRole('textbox', { name: /last name/i })).toHaveValue(
    fakeUserLoginData.lastName
  );

  // user types into email field
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserLoginData.email
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
    fakeUserLoginData.email
  );

  // user types into password field
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 6 characters)'),
    fakeUserLoginData.password
  );
  expect(
    screen.getByPlaceholderText('Password (min. 6 characters)')
  ).toHaveValue(fakeUserLoginData.password);

  // user types into confirm password field
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserLoginData.confirmPassword
  );
  expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue(
    fakeUserLoginData.confirmPassword
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
  const fakeUserLoginData = {
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    email: 'daniel.jacoshenk@gmail',
    password: 'password',
    confirmPassword: 'password',
  };

  when(mockedAuth.createUserWithEmailAndPassword)
    .calledWith(fakeUserLoginData.email, fakeUserLoginData.password)
    .mockRejectedValue({
      code: 'auth/email-already-in-use',
    });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  // user types into first name field
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    fakeUserLoginData.firstName
  );
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
    fakeUserLoginData.firstName
  );

  // user types into last name field
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    fakeUserLoginData.lastName
  );
  expect(screen.getByRole('textbox', { name: /last name/i })).toHaveValue(
    fakeUserLoginData.lastName
  );

  // user types into email field
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserLoginData.email
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
    fakeUserLoginData.email
  );

  // user types into password field
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 6 characters)'),
    fakeUserLoginData.password
  );
  expect(
    screen.getByPlaceholderText('Password (min. 6 characters)')
  ).toHaveValue(fakeUserLoginData.password);

  // user types into confirm password field
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserLoginData.confirmPassword
  );
  expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue(
    fakeUserLoginData.confirmPassword
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
  const fakeUserLoginData = {
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    email: 'hello@dannyjaco.me',
    password: 'pass',
    confirmPassword: 'pass',
  };

  when(mockedAuth.createUserWithEmailAndPassword)
    .calledWith(fakeUserLoginData.email, fakeUserLoginData.password)
    .mockRejectedValue({
      code: 'auth/weak-password',
    });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserRegisterPage />
      </BrowserRouter>
    </Provider>
  );

  // user types into first name field
  userEvent.type(
    screen.getByRole('textbox', { name: /first name/i }),
    fakeUserLoginData.firstName
  );
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
    fakeUserLoginData.firstName
  );

  // user types into last name field
  userEvent.type(
    screen.getByRole('textbox', { name: /last name/i }),
    fakeUserLoginData.lastName
  );
  expect(screen.getByRole('textbox', { name: /last name/i })).toHaveValue(
    fakeUserLoginData.lastName
  );

  // user types into email field
  userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    fakeUserLoginData.email
  );
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
    fakeUserLoginData.email
  );

  // user types into password field
  userEvent.type(
    screen.getByPlaceholderText('Password (min. 6 characters)'),
    fakeUserLoginData.password
  );
  expect(
    screen.getByPlaceholderText('Password (min. 6 characters)')
  ).toHaveValue(fakeUserLoginData.password);

  // user types into confirm password field
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserLoginData.confirmPassword
  );
  expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue(
    fakeUserLoginData.confirmPassword
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
  const fakeUserLoginData = {
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
    fakeUserLoginData.password
  );
  userEvent.type(
    screen.getByPlaceholderText('Confirm Password'),
    fakeUserLoginData.confirm_password
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
