import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { axe } from 'jest-axe';
import { when, resetAllWhenMocks } from 'jest-when';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';

import { auth } from 'setupFirebase';
import UserLoginPage from 'pages/UserLoginPage/UserLoginPage';
import store from 'store/store';

jest.mock('setupFirebase');

const mockedAuth = auth as jest.Mocked<typeof auth>;

beforeEach(() => {
  resetAllWhenMocks();
});

describe('a11y violations', () => {
  test('if component has a11y violations', async () => {
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
});

describe('initial render', () => {
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
});

describe('user attempts to login', () => {
  test('if user does not fill out form fields', async () => {
    when(mockedAuth.signInWithEmailAndPassword)
      .calledWith('', '')
      .mockRejectedValue({
        code: 'auth/invalid-email',
      });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserLoginPage />
        </BrowserRouter>
      </Provider>
    );

    // user clicks on login button
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    // error message should appear
    await waitFor(() => {
      expect(
        screen.getByRole('alert', { name: /email error/i })
      ).toBeInTheDocument();
    });
  });

  test('if user is not registered', async () => {
    const fakeUserData = {
      email: 'daniel.jacoshenk@gmail.com',
      password: 'password',
    };

    when(mockedAuth.signInWithEmailAndPassword)
      .calledWith(fakeUserData.email, fakeUserData.password)
      .mockRejectedValue({
        code: 'auth/user-not-found',
      });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserLoginPage />
        </BrowserRouter>
      </Provider>
    );

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

  test('if user submits form with wrong password', async () => {
    const fakeUserData = {
      email: 'daniel.jacoshenk@gmail.com',
      password: 'password',
    };

    when(mockedAuth.signInWithEmailAndPassword)
      .calledWith(fakeUserData.email, fakeUserData.password)
      .mockRejectedValue({
        code: 'auth/wrong-password',
      });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserLoginPage />
        </BrowserRouter>
      </Provider>
    );

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
});

describe('golden path', () => {
  test('if user submits form successfully', async () => {
    jest.useFakeTimers();

    const history = createMemoryHistory();

    history.push('/login');

    const fakeRegisteredUser = {
      email: 'daniel.jacoshenk@gmail.com',
      password: 'password123!',
    };

    when(mockedAuth.signInWithEmailAndPassword)
      .calledWith(fakeRegisteredUser.email, fakeRegisteredUser.password)
      .mockResolvedValue({
        user: {
          uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
        },
      } as any);

    render(
      <Provider store={store}>
        <Router history={history}>
          <UserLoginPage />
        </Router>
      </Provider>
    );

    // current page should be login page
    expect(history.location.pathname).toBe('/login');

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

  test('if user is routed back to the home page', () => {
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
});
