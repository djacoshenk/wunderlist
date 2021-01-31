import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import UserStatusLoader from './UserStatusLoader';

import currentLoadingStatusReducer from 'reducers/currentLoadingStatusReducer';
import store from 'store/index';

test('component renders with initial state in Redux store', () => {
  const initialState = {
    loadingStatus: { loadingMessage: 'Logging In...', isLoading: false },
  };
  const rootReducer = combineReducers({
    loadingStatus: currentLoadingStatusReducer,
  });
  const reduxStore = createStore(rootReducer, initialState);

  render(
    <Provider store={reduxStore}>
      <BrowserRouter>
        <UserStatusLoader />
      </BrowserRouter>
    </Provider>
  );

  expect(
    screen.getByRole('heading', { name: /logging in/i })
  ).toBeInTheDocument();
});

test('component is accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UserStatusLoader />
      </BrowserRouter>
    </Provider>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
