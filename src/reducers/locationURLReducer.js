const ACTIONS = {
  SET_LOCATION_URL: 'SET_LOCATION_URL',
};

export function setLocationURL(url) {
  return {
    type: ACTIONS.SET_LOCATION_URL,
    payload: url,
  };
}

const initialState = {
  locationURL: '',
};

export default function locationURLReducer(state = initialState, action) {
  if (action.type === ACTIONS.SET_LOCATION_URL) {
    return { ...state, locationURL: action.payload };
  } else {
    return state;
  }
}
