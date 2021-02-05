export type LoadingStatusAction = {
  type: 'SET_LOADING_STATUS';
  payload: { isLoading: boolean; loadingMessage?: string };
};

export type LoadingStatusState = {
  isLoading: boolean;
  loadingMessage?: string;
};

// action creator -> return value should be an action
export function setCurrentLoadingStatus(
  isLoading: boolean,
  loadingMessage?: string
) {
  return {
    type: 'SET_LOADING_STATUS',
    payload: {
      isLoading,
      loadingMessage,
    },
  };
}

const initialState = {
  isLoading: false,
  loadingMessage: '',
};

// reducer function always return the state structure
export default function currentLoadingStatusReducer(
  state: LoadingStatusState = initialState,
  action: LoadingStatusAction
) {
  if (action.type === 'SET_LOADING_STATUS') {
    return {
      ...state,
      isLoading: action.payload.isLoading,
      loadingMessage: action.payload.loadingMessage,
    };
  } else {
    return state;
  }
}
