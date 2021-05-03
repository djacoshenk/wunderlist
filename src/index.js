import React from 'react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import './styles.scss';
import store from 'store/store';

Sentry.init({
  dsn:
    'https://25658a20be6744259d5641f5c79d499b@o504051.ingest.sentry.io/5590107',
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
