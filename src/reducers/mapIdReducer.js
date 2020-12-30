const ACTIONS = {
  SET_MAP_ID: 'SET_MAP_ID',
};

export function setMapId(id) {
  return {
    type: ACTIONS.SET_MAP_ID,
    payload: id,
  };
}

const initialState = {
  mapId: 0,
};

export default function mapIdReducer(state = initialState, action) {
  if (action.type === ACTIONS.SET_MAP_ID) {
    return { ...state, mapId: action.payload };
  } else {
    return state;
  }
}
