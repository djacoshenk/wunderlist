import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { when, resetAllWhenMocks } from 'jest-when';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';

import HomePage from 'pages/HomePage/HomePage';
import currentLoadingStatusReducer from 'reducers/currentLoadingStatusReducer';
import store from 'store/store';

const mockedLocalStorage = localStorage as jest.Mocked<typeof localStorage>;

beforeEach(() => {
  resetAllWhenMocks();
});

describe('initial render', () => {
  test('if cards and images render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    // header images and text should render
    expect(screen.getByRole('img', { name: /globe/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /wunderlist/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /favorite/i })
    ).toBeInTheDocument();

    // card links and images render
    expect(screen.getByRole('link', { name: /burgers/i })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /cheeseburger/i })
    ).toBeInTheDocument();
  });
});

describe('user logging in', () => {
  test('if loading message renders', () => {
    const initialState = {
      loadingStatus: { loadingMessage: 'Logging In...', isLoading: true },
    };
    const rootReducer = combineReducers({
      loadingStatus: currentLoadingStatusReducer,
    });
    const reduxStore = createStore(rootReducer, initialState);

    render(
      <Provider store={reduxStore}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: /logging in/i })
    ).toBeInTheDocument();
  });
});

describe('search bar', () => {
  test('if location url from local storage renders', () => {
    const history = createMemoryHistory();

    when(mockedLocalStorage.getItem)
      .calledWith('locationParam')
      .mockReturnValue(JSON.stringify('Los Angeles, CA'));

    render(
      <Provider store={store}>
        <Router history={history}>
          <HomePage />
        </Router>
      </Provider>
    );

    // link is updated with location url
    expect(screen.getByRole('link', { name: /burgers/i })).toHaveAttribute(
      'href',
      '/search/Burgers/Los Angeles, CA'
    );

    // user is able to click link
    userEvent.click(screen.getByRole('link', { name: /burgers/i }));

    // user clicks link and is routed to search page
    expect(history.location.pathname).toBe('/search/Burgers/Los Angeles, CA');
  });

  test('if user can update the card link with location param', async () => {
    const history = createMemoryHistory();

    when(mockedLocalStorage.getItem)
      .calledWith('locationParam')
      .mockReturnValue(JSON.stringify(''));

    render(
      <Provider store={store}>
        <Router history={history}>
          <HomePage />
        </Router>
      </Provider>
    );

    // user types into search bar location param
    userEvent.type(
      screen.getByRole('textbox', { name: /near/i }),
      'New York, NY'
    );

    expect(screen.getByRole('textbox', { name: /near/i })).toHaveValue(
      'New York, NY'
    );

    // card link updates
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /burgers/i })).toHaveAttribute(
        'href',
        '/search/Burgers/New York, NY'
      );
    });

    // user is able to click link
    userEvent.click(screen.getByRole('link', { name: /burgers/i }));

    // user clicks link and is routed to search page
    expect(history.location.pathname).toBe('/search/Burgers/New York, NY');
  });
});
