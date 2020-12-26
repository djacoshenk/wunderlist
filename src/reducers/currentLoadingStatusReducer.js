const ACTIONS = {
  SET_LOADING_STATUS: 'SET_LOADING_STATUS',
};

export function setCurrentLoadingStatus(bool, message) {
  return {
    type: ACTIONS.SET_LOADING_STATUS,
    payload: {
      bool,
      message,
    },
  };
}

const initialState = {
  loadingMessage: '',
  isLoading: false,
};

export default function currentLoadingStatusReducer(
  state = initialState,
  action
) {
  if (action.type === ACTIONS.SET_LOADING_STATUS) {
    return {
      ...state,
      loadingMessage: action.payload.message,
      isLoading: action.payload.bool,
    };
  } else {
    return state;
  }
}
