import { START_LOAD, LOAD_ERROR, END_LOAD } from "../actions/actionCreators";

export default function Loading(
  state = { loading: false, error: null },
  action
) {
  const { error, type } = action;
  switch (type) {
    case START_LOAD:
      return { ...state, error: null, loading: true };
    case END_LOAD:
      return { ...state, loading: false };
    case LOAD_ERROR:
      return { ...state, loading: false, error: error };
    default:
      return state;
  }
}
