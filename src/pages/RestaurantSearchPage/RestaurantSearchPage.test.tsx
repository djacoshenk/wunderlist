import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import RestaurantSearchPage from './RestaurantSearchPage';

import store from 'store/index';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ term: 'Burgers', location: 'Los Angeles, CA' }),
}));

test('component renders with updated document title and loader', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <RestaurantSearchPage />
      </BrowserRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(document.title).toBe(
      'wunderlist - The best BURGERS in Los Angeles, CA'
    );
  });

  expect(screen.getByText(/burgers/i)).toBeInTheDocument();
  expect(screen.getByText(/los angeles, ca/i)).toBeInTheDocument();

  // expect loader bubbles to render
  expect(screen.getAllByTestId('loader-bubble')).toHaveLength(3);
});