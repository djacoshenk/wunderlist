import { render as rtlRender } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import UserStatusLoader from './UserStatusLoader';

import store from 'store/index';

test('component is accessible', async () => {
  const { container } = rtlRender(
    <Provider store={store}>
      <BrowserRouter>
        <UserStatusLoader />
      </BrowserRouter>
    </Provider>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
