import {
  REGISTER_USER_RESPONSE,
  START_REGISTER_USER,
  REGISTER_ERROR,
  CLEAR_REGISTER_MESSAGES
} from "../actions/registerActionCreators";

export default function Register(state = "", action) {
  const { type, error, response } = action;
  switch (type) {
    case START_REGISTER_USER:
      return {
        ...state,
        loading: true
      };

    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error
      };
    case REGISTER_USER_RESPONSE:
      return {
        ...state,
        loading: false,
        response
      };
    case CLEAR_REGISTER_MESSAGES: {
      const { error, response, ...rest } = state;
      return rest;
    }
    default:
      return state;
  }
}
