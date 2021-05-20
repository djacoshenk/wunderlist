import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { when, resetAllWhenMocks } from 'jest-when';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import {
  fakeCurrentUserDataNoSavedPlaces,
  fakeCurrentUserDataWithSavedPlaces,
} from '__tests__/fixtures/fakeCurrentUserData';
import { fakeRestaurantData } from '__tests__/fixtures/fakeRestaurantData';
import { fakeReviewsData } from '__tests__/fixtures/fakeReviewsData';
import RestaurantProfilePage from 'pages/RestaurantProfilePage/RestaurantProfilePage';
import store from 'store/store';
import { auth, firestore } from 'setupFirebase';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ alias: 'montys-good-burger-los-angeles' }),
  useLocation: () => ({ state: { place: `Monty's Good Burger` } }),
}));
jest.mock('setupFirebase');

beforeEach(() => {
  resetAllWhenMocks();
});

const FETCH_RESTAURANT_DATA_URL = `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/montys-good-burger-los-angeles`;
const FETCH_RESTAURANT_REVIEWS_URL = `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/montys-good-burger-los-angeles/reviews`;

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAuth = auth as jest.Mocked<typeof auth>;
const mockedFirestore = firestore as jest.Mocked<typeof firestore>;
const mockedLocalStorage = localStorage as jest.Mocked<typeof localStorage>;

describe('initial page render', () => {
  test('if document title and loader render', async () => {
    const mockedCancelToken: any = {
      source: jest.fn(),
    };

    const mockedCancelTokenSource: any = {
      token: 'mockedAxiosCancelToken',
      cancel: jest.fn(),
    };

    when(mockedAxios.CancelToken).mockImplementation(() => mockedCancelToken);

    when(mockedAxios.CancelToken.source as any)
      .calledWith()
      .mockImplementation(() => mockedCancelTokenSource);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RestaurantProfilePage />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(document.title).toBe(`wunderlist - Monty's Good Burger`);
    });

    // restaurant loader should render
    expect(
      screen.getByRole('heading', { name: /finding you more/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /monty's good burger/i })
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('loader-bubble')).toHaveLength(3);
  });
});

describe('without a current user', () => {
  test('if component renders profile card', async () => {
    jest.useFakeTimers();

    const mockedCancelToken: any = {
      source: jest.fn(),
    };

    const mockedCancelTokenSource: any = {
      token: 'mockedAxiosCancelToken',
      cancel: jest.fn(),
    };

    when(mockedAxios.CancelToken).mockImplementation(() => mockedCancelToken);

    when(mockedAxios.CancelToken.source as any)
      .calledWith()
      .mockImplementation(() => mockedCancelTokenSource);

    when(mockedAxios.get)
      .calledWith(FETCH_RESTAURANT_DATA_URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        cancelToken: mockedCancelTokenSource.token,
      })
      .mockResolvedValue(fakeRestaurantData);

    when(mockedAxios.get)
      .calledWith(FETCH_RESTAURANT_REVIEWS_URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        cancelToken: mockedCancelTokenSource.token,
      })
      .mockResolvedValue(fakeReviewsData);

    mockedAuth.currentUser = null;

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RestaurantProfilePage />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      jest.advanceTimersByTime(4000);

      expect(
        screen.getByRole('heading', { name: fakeRestaurantData.data.name })
      ).toBeInTheDocument();
    });

    // without a user, the save button should not render
    expect(screen.queryByRole('button', { name: /save/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /saved/i })).toBeNull();

    // image carousel should render
    expect(
      screen.getAllByRole('img', { name: /restaurant-food/i })
    ).toHaveLength(5);

    // restaurant info should render
    expect(screen.getByText('2110 Reviews')).toBeInTheDocument();
    expect(screen.getByText(/burgers, vegan, fast food/i)).toBeInTheDocument();
    expect(
      screen.getByText(fakeRestaurantData.data.display_phone)
    ).toBeInTheDocument();
    expect(
      screen.getByText(fakeRestaurantData.data.location.display_address[0])
    ).toBeInTheDocument();
    expect(
      screen.getByText(fakeRestaurantData.data.location.display_address[1])
    ).toBeInTheDocument();

    // reviews should render
    expect(
      screen.getByText(fakeReviewsData.data.reviews[0].user.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(fakeReviewsData.data.reviews[0].text)
    ).toBeInTheDocument();
    expect(
      screen.getByText(fakeReviewsData.data.reviews[1].user.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(fakeReviewsData.data.reviews[1].text)
    ).toBeInTheDocument();

    // google maps button link should render
    expect(
      screen.getByRole('button', { name: /directions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /directions/i })
    ).toBeInTheDocument();
  });
});

describe('with a current user', () => {
  test('if the component renders the save button', async () => {
    jest.useFakeTimers();

    const mockedCancelToken: any = {
      source: jest.fn(),
    };

    const mockedCancelTokenSource: any = {
      token: 'mockedAxiosCancelToken',
      cancel: jest.fn(),
    };

    when(mockedAxios.CancelToken).mockImplementation(() => mockedCancelToken);

    when(mockedAxios.CancelToken.source as any)
      .calledWith()
      .mockImplementation(() => mockedCancelTokenSource);

    when(mockedAxios.get)
      .calledWith(FETCH_RESTAURANT_DATA_URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        cancelToken: mockedCancelTokenSource.token,
      })
      .mockResolvedValue(fakeRestaurantData);

    when(mockedAxios.get)
      .calledWith(FETCH_RESTAURANT_REVIEWS_URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        cancelToken: mockedCancelTokenSource.token,
      })
      .mockResolvedValue(fakeReviewsData);

    when(mockedLocalStorage.getItem)
      .calledWith('currentUser')
      .mockReturnValue(JSON.stringify(fakeCurrentUserDataNoSavedPlaces));

    mockedAuth.currentUser = fakeCurrentUserDataNoSavedPlaces;

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

    when(mockedFirestore.collection)
      .calledWith('savedPlaces')
      .mockImplementationOnce(() => {
        return {
          doc: () => {
            return {
              set: jest.fn(),
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
                      ...fakeCurrentUserDataNoSavedPlaces,
                      savedPlaces: [fakeRestaurantData.data],
                    };
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
              update: jest.fn(),
            };
          },
        } as any;
      });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RestaurantProfilePage />
        </BrowserRouter>
      </Provider>
    );

    // save button should render
    await waitFor(() => {
      jest.advanceTimersByTime(4000);

      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });

    // user saves restaurant to saved places
    userEvent.click(screen.getByRole('button', { name: /save/i }));

    // saved button should render
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /saved/i })
      ).toBeInTheDocument();
    });

    // user unsaves restaurant from saved places
    userEvent.click(screen.getByRole('button', { name: /saved/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });
  });

  test('if the component renders the saved button', async () => {
    jest.useFakeTimers();

    const mockedCancelToken: any = {
      source: jest.fn(),
    };

    const mockedCancelTokenSource: any = {
      token: 'mockedAxiosCancelToken',
      cancel: jest.fn(),
    };

    when(mockedAxios.CancelToken).mockImplementation(() => mockedCancelToken);

    when(mockedAxios.CancelToken.source as any)
      .calledWith()
      .mockImplementation(() => mockedCancelTokenSource);

    when(mockedAxios.get)
      .calledWith(FETCH_RESTAURANT_DATA_URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        cancelToken: mockedCancelTokenSource.token,
      })
      .mockResolvedValue(fakeRestaurantData);

    when(mockedAxios.get)
      .calledWith(FETCH_RESTAURANT_REVIEWS_URL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
        },
        cancelToken: mockedCancelTokenSource.token,
      })
      .mockResolvedValue(fakeReviewsData);

    when(mockedLocalStorage.getItem)
      .calledWith('currentUser')
      .mockReturnValue(JSON.stringify(fakeCurrentUserDataWithSavedPlaces));

    auth.currentUser = fakeCurrentUserDataWithSavedPlaces;

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
                    return fakeCurrentUserDataWithSavedPlaces;
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
          <RestaurantProfilePage />
        </BrowserRouter>
      </Provider>
    );

    // save button should render
    await waitFor(() => {
      jest.advanceTimersByTime(4000);

      expect(
        screen.getByRole('button', { name: /saved/i })
      ).toBeInTheDocument();
    });
  });
});
