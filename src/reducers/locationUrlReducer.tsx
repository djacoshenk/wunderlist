type LocationUrl = string | undefined;

type LocationUrlAction = {
  type: 'SET_LOCATION_URL';
  payload: { url: LocationUrl };
};

export function setLocationUrl(url: LocationUrl) {
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
) {
  if (action.type === 'SET_LOCATION_URL') {
    return { ...state, locationUrl: action.payload.url };
  } else {
    return state;
  }
}
