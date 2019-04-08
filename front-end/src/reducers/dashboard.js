import {
  START_LOAD_DASHBOARD,
  RECEIVE_DASHBOARD,
  LOAD_ERROR_DASHBOARD,
  STOP_LOAD_DASHBOARD
} from "../actions/dashboardActionCreators";

export default function Dashboard(state = "", action) {
  const { type, error, response } = action;
  switch (type) {
    case START_LOAD_DASHBOARD:
      return {
        ...state,
        loading: true
      };
    case STOP_LOAD_DASHBOARD:
      return {
        ...state,
        loading: false
      };
    case LOAD_ERROR_DASHBOARD:
      return {
        ...state,
        loading: false,
        error
      };
    case RECEIVE_DASHBOARD:
      return {
        ...state,
        loading: false,
        response
      };
    // case CLEAR_REGISTER_MESSAGES: {
    //   const { error, response, ...rest } = state;
    //   return rest;
    // }
    default:
      return state;
  }
}
