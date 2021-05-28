type MapIdAction = {
  type: 'SET_MAP_ID';
  payload: { id: number };
};

type MapIdState = {
  mapId: number;
};

export function setMapId(id: number): MapIdAction {
  return {
    type: 'SET_MAP_ID',
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
  if (action.type === 'SET_MAP_ID') {
    return { ...state, mapId: action.payload.id };
  } else {
    return state;
  }
}
