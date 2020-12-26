import { combineReducers, createStore } from 'redux';

import currentLoadingStatusReducer from 'reducers/currentLoadingStatusReducer';
import locationURLReducer from 'reducers/locationURLReducer';

const rootReducer = combineReducers({
  currentLoadingStatus: currentLoadingStatusReducer,
  locationURL: locationURLReducer,
});

const store = createStore(rootReducer);

export default store;
