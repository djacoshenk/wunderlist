import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import RestaurantTypeCards from './RestaurantTypeCards';

import store from 'store/index';

beforeEach(() => {
  localStorage.clear();

  render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantTypeCards />
      </BrowserRouter>
    </Provider>
  );
});

test('component renders w/ links and images', () => {
  // link is rendered
  expect(screen.getByRole('link', { name: /burgers/i })).toBeInTheDocument();

  // image is rendered
  expect(
    screen.getByRole('img', { name: /cheeseburger/i })
  ).toBeInTheDocument();
});

test('user clicks card without a location url and error message appears', () => {
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

test('location url is set from local storage', () => {
  cleanup();

  // set the location param in storage
  localStorage.setItem('locationParam', JSON.stringify('Los Angeles, CA'));

  render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantTypeCards />
      </BrowserRouter>
    </Provider>
  );

  // after the user clicks on link, error message should be null
  userEvent.click(screen.getByRole('link', { name: /burgers/i }));

  expect(
    screen.queryByRole('alert', { name: /please first provide a location/i })
  ).toBeNull();
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
