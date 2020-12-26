import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import currentLoadingStatusReducer from 'reducers/currentLoadingStatusReducer';
import locationURLReducer from 'reducers/locationURLReducer';

const rootReducer = combineReducers({
  loadingStatus: currentLoadingStatusReducer,
  location: locationURLReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
