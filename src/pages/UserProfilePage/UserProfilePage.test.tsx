import { render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import UserProfilePage from './UserProfilePage';

import store from 'store/index';
import { firestore } from 'setupFirebase';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useLocation: () => ({
    state: {
      firstName: 'Danny',
      lastName: 'Jacoshenk',
    },
  }),
  useParams: () => ({
    uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
  }),
}));
jest.mock('setupFirebase');

const mockedFirestore = firestore as jest.Mocked<typeof firestore>;

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

  const fakeCurrentUser: any = {
    email: 'daniel.jacoshenk@gmail.com',
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
  };

  mockedFirestore.collection.mockImplementationOnce(() => {
    return {
      doc: () => {
        return {
          get: () => {
            return {
              exists: true,
              data: () => {
                return fakeCurrentUser;
              },
            };
          },
        };
      },
    } as any;
  });

  mockedFirestore.collection.mockImplementationOnce(() => {
    return {
      doc: () => {
        return {
          get: () => {
            return {
              exists: false,
            };
          },
        };
      },
    } as any;
  });

  act(() => {
    jest.advanceTimersByTime(4000);
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserProfilePage />
      </BrowserRouter>
    </Provider>
  );

  // document title should be updated with user info
  await waitFor(() => {
    expect(document.title).toBe(`wunderlist - Danny J.'s Profile`);
  });

  // expect user full name to render
  await waitFor(() => {
    expect(screen.getByText(/^(Danny Jacoshenk)$/)).toBeInTheDocument();
  });

  // expect saved places quantity to render
  expect(screen.getByText('0')).toBeInTheDocument();

  // saved cards message should render
  expect(
    screen.getByText(/you have not saved any places/i)
  ).toBeInTheDocument();
});

test('component renders with a saved place', async () => {
  jest.useFakeTimers();

  const fakeSavedPlace: any = [
    {
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
    },
  ];

  const fakeCurrentUser: any = {
    email: 'daniel.jacoshenk@gmail.com',
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
  };

  mockedFirestore.collection.mockImplementationOnce(() => {
    return {
      doc: () => {
        return {
          get: () => {
            return {
              exists: true,
              data: () => {
                return fakeCurrentUser;
              },
            };
          },
        };
      },
    } as any;
  });

  mockedFirestore.collection.mockImplementationOnce(() => {
    return {
      doc: () => {
        return {
          get: () => {
            return {
              exists: true,
              data: () => {
                return {
                  savedPlaces: fakeSavedPlace,
                };
              },
            };
          },
        };
      },
    } as any;
  });

  act(() => {
    jest.advanceTimersByTime(4000);
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserProfilePage />
      </BrowserRouter>
    </Provider>
  );

  // expect user full name to render
  await waitFor(() => {
    expect(screen.getByText(/^(Danny Jacoshenk)$/)).toBeInTheDocument();
  });

  // expect saved places quantity to render
  expect(screen.getByText('1')).toBeInTheDocument();

  // expect saved place to render
  expect(
    screen.getByRole('link', { name: /monty's good burger/i })
  ).toBeInTheDocument();
});
