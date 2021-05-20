import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import RestaurantSearchPage from 'pages/RestaurantSearchPage/RestaurantSearchPage';
import store from 'store/store';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ term: 'Burgers', location: 'Los Angeles, CA' }),
}));

describe('initial render', () => {
  test('if document title and loader render', async () => {
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
});
