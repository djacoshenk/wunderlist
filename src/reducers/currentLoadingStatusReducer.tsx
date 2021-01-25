type LoadingStatusAction = {
  type: 'SET_LOADING_STATUS';
  payload: { bool: boolean; message: string };
};

// action creator -> return value should be an action
export function setCurrentLoadingStatus(bool: boolean, message: string) {
  return {
    type: 'SET_LOADING_STATUS',
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
) {
  if (action.type === 'SET_LOADING_STATUS') {
    return {
      ...state,
      loadingMessage: action.payload.message,
      isLoading: action.payload.bool,
    };
  } else {
    return state;
  }
}
