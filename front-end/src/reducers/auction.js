import { RECEIVE_AUCTIONS, EMPTY_AUCTIONS } from "../actions/actionCreators";
// import { initialState } from "./index";

export default function Auction(state = [], action) {
  const { payload, type, extra } = action;
  switch (type) {
    case RECEIVE_AUCTIONS:
      return {
        ...state,
        auctions: payload,
        extra
      };
    case EMPTY_AUCTIONS:
      return { ...state, auctions: [] };
    default:
      return state;
  }
}
