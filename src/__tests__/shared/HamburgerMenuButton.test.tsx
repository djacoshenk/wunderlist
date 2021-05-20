import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';

import HamburgerMenuButton from 'shared/HamburgerMenuButton/HamburgerMenuButton';
import store from 'store/store';
import { auth, firestore } from 'setupFirebase';

jest.mock('setupFirebase');

const mockedAuth = auth as jest.Mocked<typeof auth>;
const mockedFirestore = firestore as jest.Mocked<typeof firestore>;

describe('a11y violations', () => {
  test('if component has a11y violations', async () => {
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
});

describe('without a current user', () => {
  test('if the login and register buttons render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HamburgerMenuButton />
        </BrowserRouter>
      </Provider>
    );

    // user clicks on hamburger button to show login and register buttons
    userEvent.click(screen.getByRole('button', { name: /open menu/i }));

    // login button should be rendered
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // register button should be rendered
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();

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

  test('if login button routes to login page', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <HamburgerMenuButton />
        </Router>
      </Provider>
    );

    // user clicks on hamburger button to show login button
    userEvent.click(screen.getByRole('button', { name: /open menu/i }));

    // login button should be rendered
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // user clicks on login button
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    // user is routed to the login page
    expect(history.location.pathname).toBe('/login');
  });

  test('if register button routes to register page', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <HamburgerMenuButton />
        </Router>
      </Provider>
    );

    // user clicks on hamburger button to show register button
    userEvent.click(screen.getByRole('button', { name: /open menu/i }));

    // register button should be rendered
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();

    // user clicks on register button
    userEvent.click(screen.getByRole('button', { name: /register/i }));

    // user is routed to the register page
    expect(history.location.pathname).toBe('/register');
  });
});

describe('with a current user', () => {
  test('if logout button renders', async () => {
    jest.useFakeTimers();

    const fakeCurrentUser: any = {
      email: 'daniel.jacoshenk@gmail.com',
      firstName: 'Danny',
      lastName: 'Jacoshenk',
      uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
    };

    mockedAuth.onAuthStateChanged.mockImplementationOnce((fn: any): any => {
      fn(fakeCurrentUser);
    });

    mockedFirestore.collection.mockImplementationOnce(() => {
      return {
        doc: () => {
          return {
            get: () => {
              return {
                data: () => {
                  return fakeCurrentUser;
                },
              };
            },
          };
        },
      } as any;
    });

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
    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: fakeCurrentUser.firstName })
      ).toBeInTheDocument();
    });

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

  test('if logout button routes to home page', async () => {
    jest.useFakeTimers();

    const history = createMemoryHistory();

    const fakeCurrentUser = {
      email: 'daniel.jacoshenk@gmail.com',
      firstName: 'Danny',
      lastName: 'Jacoshenk',
      uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
    };

    mockedAuth.onAuthStateChanged.mockImplementationOnce((fn: any): any => {
      fn(fakeCurrentUser);
    });

    mockedFirestore.collection.mockImplementationOnce(() => {
      return {
        doc: () => {
          return {
            get: () => {
              return {
                data: () => {
                  return fakeCurrentUser;
                },
              };
            },
          };
        },
      } as any;
    });

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

    // name should be rendered as link
    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: fakeCurrentUser.firstName })
      ).toBeInTheDocument();
    });

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

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
});
