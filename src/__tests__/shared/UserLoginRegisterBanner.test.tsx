import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';

import UserLoginRegisterBanner from 'shared/UserLoginRegisterBanner/UserLoginRegisterBanner';
import store from 'store/store';

const mockedLocalStorage = localStorage as jest.Mocked<typeof localStorage>;

describe('a11y violations', () => {
  test('if login and register buttons are accessible', async () => {
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

  test('if logout buttons are accessible', async () => {
    const fakeCurrentUser = {
      email: 'daniel.jacoshenk@gmail.com',
      firstName: 'Danny',
      lastName: 'Jacoshenk',
      uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
    };

    mockedLocalStorage.getItem.mockReturnValue(JSON.stringify(fakeCurrentUser));

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
});

describe('without a current user', () => {
  test('if login and register buttons render', () => {
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
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();

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

    // user clicks on register button
    userEvent.click(screen.getByRole('button', { name: /register/i }));

    // user should be routed to the register page
    expect(history.location.pathname).toBe('/register');
  });
});

describe('with a current user', () => {
  test('if logout button renders', () => {
    jest.useFakeTimers();

    const fakeCurrentUser = {
      email: 'daniel.jacoshenk@gmail.com',
      firstName: 'Danny',
      lastName: 'Jacoshenk',
      uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
    };

    mockedLocalStorage.getItem.mockReturnValue(JSON.stringify(fakeCurrentUser));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserLoginRegisterBanner />
        </BrowserRouter>
      </Provider>
    );

    // name should be rendered as link
    expect(
      screen.getByRole('link', { name: fakeCurrentUser.firstName })
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
      jest.advanceTimersByTime(2000);
    });

    // logout button should not be rendered
    expect(screen.queryByRole('button', { name: /logout/i })).toBeNull();
  });

  test('logout button routes to home page', () => {
    jest.useFakeTimers();

    const history = createMemoryHistory();

    const fakeCurrentUser = {
      email: 'daniel.jacoshenk@gmail.com',
      firstName: 'Danny',
      lastName: 'Jacoshenk',
      uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
    };

    mockedLocalStorage.getItem.mockReturnValue(JSON.stringify(fakeCurrentUser));

    render(
      <Provider store={store}>
        <Router history={history}>
          <UserLoginRegisterBanner />
        </Router>
      </Provider>
    );

    // clicking on the chevron button should open the menu and show logout button
    userEvent.click(screen.getByRole('button', { name: /toggle menu/i }));

    // user clicks on logout button
    userEvent.click(screen.getByRole('button', { name: /logout/i }));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // user should be routed to the home page
    expect(history.location.pathname).toBe('/');
  });
});
