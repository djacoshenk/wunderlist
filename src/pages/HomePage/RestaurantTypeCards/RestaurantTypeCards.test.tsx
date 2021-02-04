import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantTypeCards from './RestaurantTypeCards';

import store from 'store/index';

const mockedLocalStorage = localStorage as jest.Mocked<typeof localStorage>;

afterEach(() => {
  cleanup();
});

test('component is accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantTypeCards />
      </BrowserRouter>
    </Provider>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('component renders w/ links and images', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantTypeCards />
      </BrowserRouter>
    </Provider>
  );

  // link is rendered
  expect(screen.getByRole('link', { name: /burgers/i })).toBeInTheDocument();

  // image is rendered
  expect(
    screen.getByRole('img', { name: /cheeseburger/i })
  ).toBeInTheDocument();
});

test('user clicks card without a location url and error message appears', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantTypeCards />
      </BrowserRouter>
    </Provider>
  );

  // error message should be null
  expect(
    screen.queryByRole('alert', {
      name: /please first provide a location/i,
    })
  ).toBeNull();

  // user clicks card without location url
  userEvent.click(screen.getByRole('link', { name: /burgers/i }));

  // error message appears
  expect(
    screen.getByRole('alert', { name: /please first provide a location/i })
  ).toBeInTheDocument();
});

test('component renders with location url from local storage', () => {
  const history = createMemoryHistory();

  mockedLocalStorage.getItem.mockReturnValue(JSON.stringify('Los Angeles, CA'));

  render(
    <Provider store={store}>
      <Router history={history}>
        <RestaurantTypeCards />
      </Router>
    </Provider>
  );

  // link is updated with location url
  expect(screen.getByRole('link', { name: /burgers/i })).toHaveAttribute(
    'href',
    '/search/Burgers/Los Angeles, CA'
  );

  // user is able to click link
  userEvent.click(screen.getByRole('link', { name: /burgers/i }));

  // user clicks link and is routed to search page
  expect(history.location.pathname).toBe('/search/Burgers/Los Angeles, CA');
});

test('user types into the search bar and updates the card link with location', async () => {
  const history = createMemoryHistory();

  mockedLocalStorage.getItem.mockReturnValue(JSON.stringify(''));

  render(
    <Provider store={store}>
      <Router history={history}>
        <RestaurantSearchBar />
        <RestaurantTypeCards />
      </Router>
    </Provider>
  );

  // user types into search bar location param
  userEvent.type(
    screen.getByRole('textbox', { name: /near/i }),
    'New York, NY'
  );

  expect(screen.getByRole('textbox', { name: /near/i })).toHaveValue(
    'New York, NY'
  );

  // card link updates
  await waitFor(() => {
    expect(screen.getByRole('link', { name: /burgers/i })).toHaveAttribute(
      'href',
      '/search/Burgers/New York, NY'
    );
  });

  // user is able to click link
  userEvent.click(screen.getByRole('link', { name: /burgers/i }));

  // user clicks link and is routed to search page
  expect(history.location.pathname).toBe('/search/Burgers/New York, NY');
});
