import { render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import UserProfilePage from './UserProfilePage';

import store from 'store/index';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useLocation: () => ({
    state: {
      first_name: 'Danny',
      last_name: 'Jacoshenk',
    },
  }),
}));

const mockedLocalStorage = localStorage as jest.Mocked<typeof localStorage>;

test('component renders with loader bubbles', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserProfilePage />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getAllByTestId(/^(loader-bubble)$/i)).toHaveLength(3);
});

test('component renders user profile without saved places', async () => {
  jest.useFakeTimers();

  const fakeUserData = [
    {
      first_name: 'Danny',
      last_name: 'Jacoshenk',
      username: 'djacoshenk',
      savedPlaces: [],
    },
  ];

  mockedLocalStorage.getItem.mockReturnValue(JSON.stringify(fakeUserData));

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserProfilePage />
      </BrowserRouter>
    </Provider>
  );

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // document title should be updated with user info
  await waitFor(() => {
    expect(document.title).toBe(`wunderlist - Danny J.'s Profile`);
  });

  // expect user full name to render
  expect(screen.getByText(/^(Danny Jacoshenk)$/)).toBeInTheDocument();

  // expect saved places quantity to render
  expect(screen.getByText('0')).toBeInTheDocument();

  // expect saved cards message to render
  expect(
    screen.getByText(/you have not saved any places/i)
  ).toBeInTheDocument();
});

test('component renders with a saved place', () => {
  jest.useFakeTimers();

  const fakeSavedPlace = {
    id: 'sYn3SNQP-j2t2XSwjlCbRg',
    alias: 'montys-good-burger-los-angeles',
    name: "Monty's Good Burger",
    image_url:
      'https://s3-media1.fl.yelpcdn.com/bphoto/BrIS_Xw9o9ldylxHXl4JWQ/o.jpg',
    review_count: 2110,
    categories: [
      {
        title: 'Burgers',
      },
      {
        title: 'Vegan',
      },
      {
        title: 'Fast Food',
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 34.06469,
      longitude: -118.30876,
    },
    price: '$$',
    location: {
      display_address: ['516 S Western Ave', 'Los Angeles, CA 90020'],
    },
    display_phone: '(213) 915-0257',
  };

  const fakeUserData = [
    {
      first_name: 'Danny',
      last_name: 'Jacoshenk',
      username: 'djacoshenk',
      savedPlaces: [fakeSavedPlace],
    },
  ];

  mockedLocalStorage.getItem.mockReturnValue(JSON.stringify(fakeUserData));

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserProfilePage />
      </BrowserRouter>
    </Provider>
  );

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // expect user full name to render
  expect(screen.getByText(/^(Danny Jacoshenk)$/)).toBeInTheDocument();

  // expect saved places quantity to render
  expect(screen.getByText('1')).toBeInTheDocument();

  // expect saved place to render
  expect(
    screen.getByRole('link', { name: /monty's good burger/i })
  ).toBeInTheDocument();
});
