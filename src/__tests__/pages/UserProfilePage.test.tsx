import { render, screen, waitFor } from '@testing-library/react';
import { when, resetAllWhenMocks } from 'jest-when';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { fakeCurrentUserDataNoSavedPlaces } from '__tests__/fixtures/fakeCurrentUserData';
import { fakeRestaurantData } from '__tests__/fixtures/fakeRestaurantData';
import UserProfilePage from 'pages/UserProfilePage/UserProfilePage';
import store from 'store/store';
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

beforeEach(() => {
  resetAllWhenMocks();
});

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

  when(mockedFirestore.collection)
    .calledWith('users')
    .mockImplementationOnce(() => {
      return {
        doc: () => {
          return {
            get: () => {
              return {
                exists: true,
                data: () => {
                  return fakeCurrentUserDataNoSavedPlaces;
                },
              };
            },
          };
        },
      } as any;
    });

  when(mockedFirestore.collection)
    .calledWith('savedPlaces')
    .mockImplementationOnce(() => {
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

  jest.advanceTimersByTime(4000);

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

  when(mockedFirestore.collection)
    .calledWith('users')
    .mockImplementationOnce(() => {
      return {
        doc: () => {
          return {
            get: () => {
              return {
                exists: true,
                data: () => {
                  return fakeCurrentUserDataNoSavedPlaces;
                },
              };
            },
          };
        },
      } as any;
    });

  when(mockedFirestore.collection)
    .calledWith('savedPlaces')
    .mockImplementationOnce(() => {
      return {
        doc: () => {
          return {
            get: () => {
              return {
                exists: true,
                data: () => {
                  return {
                    savedPlaces: [fakeRestaurantData.data],
                  };
                },
              };
            },
          };
        },
      } as any;
    });

  jest.advanceTimersByTime(4000);

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
