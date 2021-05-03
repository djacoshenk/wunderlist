import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { auth, firestore } from 'setupFirebase';
import RestaurantProfilePage from 'pages/RestaurantProfilePage/RestaurantProfilePage';
import store from 'store/store';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ alias: 'montys-good-burger-los-angeles' }),
  useLocation: () => ({ state: { place: `Monty's Good Burger` } }),
}));
jest.mock('setupFirebase');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAuth = auth as jest.Mocked<typeof auth>;
const mockedFirestore = firestore as jest.Mocked<typeof firestore>;
const mockedLocalStorage = localStorage as jest.Mocked<typeof localStorage>;

test('component renders with document title and loader', async () => {
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

test('component renders profile card without a current user', async () => {
  jest.useFakeTimers();

  const fakeRestaurantData = {
    data: {
      id: 'sYn3SNQP-j2t2XSwjlCbRg',
      alias: 'montys-good-burger-los-angeles',
      name: "Monty's Good Burger",
      photos: [
        'https://s3-media1.fl.yelpcdn.com/bphoto/BrIS_Xw9o9ldylxHXl4JWQ/o.jpg',
        'https://s3-media3.fl.yelpcdn.com/bphoto/bUUBQ4hOq7HT0AqtgV_W6A/o.jpg',
        'https://s3-media2.fl.yelpcdn.com/bphoto/UUQEJw_RVO3CVChbiLPWTA/o.jpg',
      ],
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
  };

  const fakeReviewsData = {
    data: {
      reviews: [
        {
          text:
            'Let me start off by saying that I am not vegan. I would drive by this place in Korea town in the evenings all the time and see long lines forming outside....',
          rating: 5,
          user: {
            name: 'Griselda S.',
          },
        },
        {
          text:
            'Came here the other night and I was beyond surprised at just how much I enjoyed the food. I recently went vegetarian and had figured that I would never have...',
          rating: 5,
          user: {
            name: 'Emilie C.',
          },
        },
        {
          text:
            "*This is a review during the Covid-19 Pandemic*\n\n\nMy second time and once again I am amazed at the quality and taste of Monty's Good Burger ! This...",
          rating: 5,

          user: {
            name: 'Amanda L.',
          },
        },
      ],
    },
  };

  const mockedRestaurantData: any = mockedAxios.get.mockResolvedValueOnce(
    fakeRestaurantData
  );
  const mockedReviewsData: any = mockedAxios.get.mockResolvedValue(
    fakeReviewsData
  );

  mockedAuth.currentUser = null;

  render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantProfilePage />
      </BrowserRouter>
    </Provider>
  );

  await act(async () => {
    await mockedRestaurantData();
  });

  await act(async () => {
    await mockedReviewsData();
  });

  act(() => {
    jest.advanceTimersByTime(4000);
  });

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: fakeRestaurantData.data.name })
    ).toBeInTheDocument();
  });

  // without a user, the save button should not render
  expect(screen.queryByRole('button', { name: /save/i })).toBeNull();
  expect(screen.queryByRole('button', { name: /saved/i })).toBeNull();

  // image carousel should render
  expect(screen.getAllByRole('img', { name: /restaurant-food/i })).toHaveLength(
    5
  );

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
  expect(screen.getByRole('link', { name: /directions/i })).toBeInTheDocument();
});

test('with a current user, the component renders the save button', async () => {
  jest.useFakeTimers();

  const fakeRestaurantData = {
    data: {
      id: 'sYn3SNQP-j2t2XSwjlCbRg',
      alias: 'montys-good-burger-los-angeles',
      name: "Monty's Good Burger",
      photos: [
        'https://s3-media1.fl.yelpcdn.com/bphoto/BrIS_Xw9o9ldylxHXl4JWQ/o.jpg',
        'https://s3-media3.fl.yelpcdn.com/bphoto/bUUBQ4hOq7HT0AqtgV_W6A/o.jpg',
        'https://s3-media2.fl.yelpcdn.com/bphoto/UUQEJw_RVO3CVChbiLPWTA/o.jpg',
      ],
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
  };

  const fakeReviewsData = {
    data: {
      reviews: [
        {
          text:
            'Let me start off by saying that I am not vegan. I would drive by this place in Korea town in the evenings all the time and see long lines forming outside....',
          rating: 5,
          user: {
            name: 'Griselda S.',
          },
        },
        {
          text:
            'Came here the other night and I was beyond surprised at just how much I enjoyed the food. I recently went vegetarian and had figured that I would never have...',
          rating: 5,
          user: {
            name: 'Emilie C.',
          },
        },
        {
          text:
            "*This is a review during the Covid-19 Pandemic*\n\n\nMy second time and once again I am amazed at the quality and taste of Monty's Good Burger ! This...",
          rating: 5,

          user: {
            name: 'Amanda L.',
          },
        },
      ],
    },
  };

  const fakeCurrentUserData: any = {
    email: 'daniel.jacoshenk@gmail.com',
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
    savedPlaces: [],
  };

  const mockedRestaurantData: any = mockedAxios.get.mockResolvedValueOnce(
    fakeRestaurantData
  );
  const mockedReviewsData: any = mockedAxios.get.mockResolvedValue(
    fakeReviewsData
  );

  render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantProfilePage />
      </BrowserRouter>
    </Provider>
  );

  mockedLocalStorage.getItem.mockReturnValue(
    JSON.stringify(fakeCurrentUserData)
  );

  auth.currentUser = fakeCurrentUserData;

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

  mockedFirestore.collection.mockImplementationOnce(() => {
    return {
      doc: () => {
        return {
          set: jest.fn(),
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
                  ...fakeCurrentUserData,
                  savedPlaces: [fakeRestaurantData.data],
                };
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
          update: jest.fn(),
        };
      },
    } as any;
  });

  await act(async () => {
    await mockedRestaurantData();
  });

  await act(async () => {
    await mockedReviewsData();
  });

  act(() => {
    jest.advanceTimersByTime(4000);
  });

  // save button should render
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  // user saves restaurant to saved places
  userEvent.click(screen.getByRole('button', { name: /save/i }));

  // saved button should render
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /saved/i })).toBeInTheDocument();
  });

  // user unsaves restaurant from saved places
  userEvent.click(screen.getByRole('button', { name: /saved/i }));

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});

test('with a current user and saved place, the component renders the saved button', async () => {
  jest.useFakeTimers();

  const fakeRestaurantData = {
    data: {
      id: 'sYn3SNQP-j2t2XSwjlCbRg',
      alias: 'montys-good-burger-los-angeles',
      name: "Monty's Good Burger",
      photos: [
        'https://s3-media1.fl.yelpcdn.com/bphoto/BrIS_Xw9o9ldylxHXl4JWQ/o.jpg',
        'https://s3-media3.fl.yelpcdn.com/bphoto/bUUBQ4hOq7HT0AqtgV_W6A/o.jpg',
        'https://s3-media2.fl.yelpcdn.com/bphoto/UUQEJw_RVO3CVChbiLPWTA/o.jpg',
      ],
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
  };

  const fakeReviewsData = {
    data: {
      reviews: [
        {
          text:
            'Let me start off by saying that I am not vegan. I would drive by this place in Korea town in the evenings all the time and see long lines forming outside....',
          rating: 5,
          user: {
            name: 'Griselda S.',
          },
        },
        {
          text:
            'Came here the other night and I was beyond surprised at just how much I enjoyed the food. I recently went vegetarian and had figured that I would never have...',
          rating: 5,
          user: {
            name: 'Emilie C.',
          },
        },
        {
          text:
            "*This is a review during the Covid-19 Pandemic*\n\n\nMy second time and once again I am amazed at the quality and taste of Monty's Good Burger ! This...",
          rating: 5,

          user: {
            name: 'Amanda L.',
          },
        },
      ],
    },
  };

  const fakeCurrentUserData: any = {
    email: 'daniel.jacoshenk@gmail.com',
    firstName: 'Danny',
    lastName: 'Jacoshenk',
    uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
    savedPlaces: [fakeRestaurantData.data],
  };

  const mockedRestaurantData: any = mockedAxios.get.mockResolvedValueOnce(
    fakeRestaurantData
  );
  const mockedReviewsData: any = mockedAxios.get.mockResolvedValue(
    fakeReviewsData
  );

  render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantProfilePage />
      </BrowserRouter>
    </Provider>
  );

  mockedLocalStorage.getItem.mockReturnValue(
    JSON.stringify(fakeCurrentUserData)
  );

  auth.currentUser = fakeCurrentUserData;

  mockedFirestore.collection.mockImplementationOnce(() => {
    return {
      doc: () => {
        return {
          get: () => {
            return {
              exists: true,
              data: () => {
                return fakeCurrentUserData;
              },
            };
          },
        };
      },
    } as any;
  });

  await act(async () => {
    await mockedRestaurantData();
  });

  await act(async () => {
    await mockedReviewsData();
  });

  act(() => {
    jest.advanceTimersByTime(4000);
  });

  // save button should render
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /saved/i })).toBeInTheDocument();
  });
});
