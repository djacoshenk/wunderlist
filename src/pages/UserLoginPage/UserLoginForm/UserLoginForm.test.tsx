import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';

import UserLoginForm from './UserLoginForm';

import store from 'store/index';

afterEach(() => {
  cleanup();

  localStorage.clear();
});

test('component is accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UserLoginForm />
      </BrowserRouter>
    </Provider>
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

// test('user submits form without filling out fields', () => {});

// test('user is not registered and submits form', () => {});

// test('user is registered and submits form with wrong password', () => {});

// test('user is registered and submits form with correct inputs', () => {});
