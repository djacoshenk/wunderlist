import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import RestaurantProfilePage from './RestaurantProfilePage';

import store from 'store/index';

type Place = {
  id: string;
  alias: string;
  photos: string[];
  name: string;
  rating: number;
  review_count: number;
  price: string;
  categories: Categories[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  display_phone: string;
  location: {
    display_address: string[];
  };
};

type Categories = { title: string };

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ alias: 'montys-good-burger-los-angeles' }),
  useLocation: () => ({ state: { place: `Monty's Good Burger` } }),
}));

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

  mockedAxios.get.mockResolvedValueOnce(fakeRestaurantData);
  mockedAxios.get.mockResolvedValueOnce(fakeReviewsData);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantProfilePage />
      </BrowserRouter>
    </Provider>
  );

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

  const fakeCurrentUserData = [
    {
      first_name: 'Danny',
      last_name: 'Jacoshenk',
      email: 'hello@dannyjaco.me',
      username: 'djacoshenk',
      password: 'password123',
      confirm_password: 'password123',
      savedPlaces: [] as Place[],
    },
  ];

  mockedAxios.get.mockResolvedValueOnce(fakeRestaurantData);
  mockedAxios.get.mockResolvedValueOnce(fakeReviewsData);

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

  // save button should render
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  // user saves restaurant to saved places
  userEvent.click(screen.getByRole('button', { name: /save/i }));

  // saved button should render
  expect(screen.getByRole('button', { name: /saved/i })).toBeInTheDocument();

  // user unsaves restaurant from saved places
  userEvent.click(screen.getByRole('button', { name: /saved/i }));

  expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
});

test('with a current user and saved place, the component renders the saved button', async () => {
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

  const fakeCurrentUserData = [
    {
      first_name: 'Danny',
      last_name: 'Jacoshenk',
      email: 'hello@dannyjaco.me',
      username: 'djacoshenk',
      password: 'password123',
      confirm_password: 'password123',
      savedPlaces: [fakeRestaurantData.data],
    },
  ];

  mockedAxios.get.mockResolvedValueOnce(fakeRestaurantData);
  mockedAxios.get.mockResolvedValueOnce(fakeReviewsData);

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

  // save button should render
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /saved/i })).toBeInTheDocument();
  });

  // user saves restaurant to saved places
  userEvent.click(screen.getByRole('button', { name: /saved/i }));

  // saved button should render
  expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();

  // user unsaves restaurant from saved places
  userEvent.click(screen.getByRole('button', { name: /save/i }));

  expect(screen.getByRole('button', { name: /saved/i })).toBeInTheDocument();
});
