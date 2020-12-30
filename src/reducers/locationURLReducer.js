const ACTIONS = {
  SET_LOCATION_URL: 'SET_LOCATION_URL',
};

export function setLocationUrl(url) {
  return {
    type: ACTIONS.SET_LOCATION_URL,
    payload: url,
  };
}

const initialState = {
  locationUrl: '',
};

export default function locationUrlReducer(state = initialState, action) {
  if (action.type === ACTIONS.SET_LOCATION_URL) {
    return { ...state, locationUrl: action.payload };
  } else {
    return state;
  }
}
