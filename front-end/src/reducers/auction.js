import {
  LOAD_AUCTIONS,
  RECEIVE_AUCTIONS,
  LOAD_AUCTIONS_ERROR
} from "../actions/actionCreators";

const initialState = {
  loading: false,
  error: null,
  auctions: []
};

export default function Auction(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case LOAD_AUCTIONS:
      return { ...state, loading: true };
    case LOAD_AUCTIONS_ERROR:
      return { ...state, loading: false, error: payload };
    case RECEIVE_AUCTIONS:
      return {
        ...state,
        loading: false,
        auctions: [...state.auctions, payload]
      };
    default:
      return state;
  }
}
