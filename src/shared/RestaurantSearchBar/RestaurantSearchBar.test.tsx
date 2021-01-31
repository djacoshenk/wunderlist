import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import RestaurantSearchBar from './RestaurantSearchBar';

import store from 'store/index';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  localStorage.clear();

  render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantSearchBar />
      </BrowserRouter>
    </Provider>
  );
});

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

test('user provides search params and submits form', async () => {
  // user types into search param fields
  userEvent.type(screen.getByRole('textbox', { name: /find/i }), 'Breakfast');

  expect(screen.getByRole('textbox', { name: /find/i })).toHaveValue(
    'Breakfast'
  );

  mockedAxios.get.mockResolvedValue({
    data: {
      categories: [
        { title: 'Breakfast & Brunch' },
        { title: 'Bed & Brunch' },
        { title: 'Diners' },
      ],
    },
  });

  expect(await screen.findByText('Diners')).toBeInTheDocument();

  userEvent.type(
    screen.getByRole('textbox', { name: /near/i }),
    'Los Angeles, CA'
  );

  expect(screen.getByRole('textbox', { name: /near/i })).toHaveValue(
    'Los Angeles, CA'
  );

  mockedAxios.get.mockResolvedValue({
    data: {
      data: [
        { city: 'Los Angeles', regionCode: 'CA' },
        { city: 'Los Angeles', regionCode: 'TX' },
        { city: 'Los Angeles County', regionCode: 'CA' },
      ],
    },
  });

  expect(await screen.findByText('Los Angeles, TX')).toBeInTheDocument();

  // user submits form
  userEvent.click(screen.getByRole('button', { name: /search/i }));

  // no error messages exist
  expect(
    screen.queryByRole('alert', { name: /please provide a term/i })
  ).toBeNull();
  expect(
    screen.queryByRole('alert', { name: /please provide a location/i })
  ).toBeNull();
});

test('user submits form without search params', () => {
  // error messages are not present
  expect(
    screen.queryByRole('alert', { name: /please provide a term/i })
  ).toBeNull();
  expect(
    screen.queryByRole('alert', { name: /please provide a location/i })
  ).toBeNull();

  // user clicks on search button
  userEvent.click(screen.getByRole('button', { name: /search/i }));

  // error messages appear
  expect(
    screen.getByRole('alert', { name: /please provide a term/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('alert', { name: /please provide a location/i })
  ).toBeInTheDocument();
});

test('component is accessible', async () => {
  const results = await axe(document.body);

  expect(results).toHaveNoViolations();
});
