import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import currentLoadingStatusReducer from 'reducers/currentLoadingStatusReducer';
import locationUrlReducer from 'reducers/locationUrlReducer';
import mapIdReducer from 'reducers/mapIdReducer';

export const rootReducer = combineReducers({
  loadingStatus: currentLoadingStatusReducer,
  location: locationUrlReducer,
  mapId: mapIdReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;

export interface RootState {
  loadingStatus: ReturnType<typeof currentLoadingStatusReducer>;
  location: ReturnType<typeof locationUrlReducer>;
  mapId: ReturnType<typeof mapIdReducer>;
}
