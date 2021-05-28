type LocationUrlAction = {
  type: 'SET_LOCATION_URL';
  payload: { url: string };
};

type LocationUrlState = {
  locationUrl: string;
};

export function setLocationUrl(url: string): LocationUrlAction {
  return {
    type: 'SET_LOCATION_URL',
    payload: { url },
  };
}

const initialState = {
  locationUrl: '',
};

export default function locationUrlReducer(
  state = initialState,
  action: LocationUrlAction
): LocationUrlState {
  if (action.type === 'SET_LOCATION_URL') {
    return { ...state, locationUrl: action.payload.url };
  } else {
    return state;
  }
}
