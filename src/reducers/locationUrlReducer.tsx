type LocationParam = string | undefined;

type LocationUrlAction = {
  type: typeof ACTIONS.SET_LOCATION_URL;
  payload: { url: LocationParam };
};

type LocationUrlState = {
  locationUrl: LocationParam;
};

const ACTIONS = {
  SET_LOCATION_URL: 'SET_LOCATION_URL',
};

export function setLocationUrl(url: LocationParam): LocationUrlAction {
  return {
    type: ACTIONS.SET_LOCATION_URL,
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
  if (action.type === ACTIONS.SET_LOCATION_URL) {
    return { ...state, locationUrl: action.payload.url };
  } else {
    return state;
  }
}
