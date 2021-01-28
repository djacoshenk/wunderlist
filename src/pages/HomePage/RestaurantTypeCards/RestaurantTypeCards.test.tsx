import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import RestaurantTypeCards from './RestaurantTypeCards';

import store from 'store/index';

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
  expect(screen.queryByText(/please first provide a location/i)).toBeNull();

  // user clicks card without location url
  userEvent.click(screen.getByRole('link', { name: /burgers/i }));

  // error message appears
  expect(
    screen.getByText(/please first provide a location/i)
  ).toBeInTheDocument();
});

test('component is accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantTypeCards />
      </BrowserRouter>
    </Provider>
  );

  expect(await axe(container)).toHaveNoViolations();
});
