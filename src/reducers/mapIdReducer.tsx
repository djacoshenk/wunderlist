interface MapIdAction {
  type: typeof ACTIONS.SET_MAP_ID;
  payload: { id: number };
}
interface MapIdState {
  mapId: number;
}

const ACTIONS = {
  SET_MAP_ID: 'SET_MAP_ID',
};

export function setMapId(id: number): MapIdAction {
  return {
    type: ACTIONS.SET_MAP_ID,
    payload: { id },
  };
}

const initialState = {
  mapId: 0,
};

export default function mapIdReducer(
  state = initialState,
  action: MapIdAction
): MapIdState {
  if (action.type === ACTIONS.SET_MAP_ID) {
    return { ...state, mapId: action.payload.id };
  } else {
    return state;
  }
}
