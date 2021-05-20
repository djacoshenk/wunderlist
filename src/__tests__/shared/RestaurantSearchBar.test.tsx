import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';
import store from 'store/store';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('a11y violations', () => {
  test('if component has a11y violations', async () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RestaurantSearchBar />
        </BrowserRouter>
      </Provider>
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});

describe('error state', () => {
  test('if user submits form without search params', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RestaurantSearchBar />
        </BrowserRouter>
      </Provider>
    );

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
});

describe('golden path', () => {
  test('if user provides search params and submits form', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RestaurantSearchBar />
        </BrowserRouter>
      </Provider>
    );

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

    // user fills in the location param field
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
});
