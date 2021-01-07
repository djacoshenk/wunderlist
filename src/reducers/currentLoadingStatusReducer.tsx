interface LoadingStatusAction {
  type: typeof ACTIONS.SET_LOADING_STATUS;
  payload: { bool: boolean; message: string };
}

interface LoadingStatusState {
  loadingMessage: string;
  isLoading: boolean;
}

const ACTIONS = {
  SET_LOADING_STATUS: 'SET_LOADING_STATUS',
};

// action creator -> return value should be an action
export function setCurrentLoadingStatus(
  bool: boolean,
  message: string
): LoadingStatusAction {
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

// reducer function always return the state structure
export default function currentLoadingStatusReducer(
  state = initialState,
  action: LoadingStatusAction
): LoadingStatusState {
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
