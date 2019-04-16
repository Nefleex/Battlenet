import {
  START_LOAD_USER,
  END_LOAD_USER,
  ERROR_USER,
  LOGIN_USER,
  LOGOUT_USER,
  RECEIVE_TRACKING,
  REMOVE_TRACKING
} from "../actions/userActionCreators";

export default function User(state = "", action) {
  const { type, error, user, payload } = action;
  switch (type) {
    case START_LOAD_USER:
      return {
        ...state,
        loading: true
      };
    case END_LOAD_USER:
      return {
        ...state,
        loading: false
      };
    case ERROR_USER:
      return {
        ...state,
        loading: false,
        error
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: false,
        user
      };
    case LOGOUT_USER:
      return "";
    case RECEIVE_TRACKING:
      return {
        ...state,
        tracking: payload
      };
    case REMOVE_TRACKING:
      let newTracking = state.tracking.filter(
        o => o.owner.toLowerCase() !== payload[0].toLowerCase()
      );
      return {
        ...state,
        tracking: newTracking
      };

    default:
      return state;
  }
}
