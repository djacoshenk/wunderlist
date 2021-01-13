import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './App';

import store from 'store/index';

import './styles.scss';

Sentry.init({
  dsn:
    'https://59b62345d84547a3a52adecf3c9c46ee@o504051.ingest.sentry.io/5590107',
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
