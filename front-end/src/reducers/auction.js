const initialState = {
  loading: false,
  loaded: false,
  error: null,
  auctions: []
};

const Auction = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "LOAD_AUCTIONS_START":
      return { ...state, loading: true };
    case "LOAD_AUCTIONS_ERROR":
      return { ...state, loading: false, error: payload };
    case "LOAD_AUCTIONS_COMPLETE":
      return {
        ...state,
        loaded: true,
        loading: false,
        auctions: [...state.auctions, payload]
      };
    default:
      return state;
  }
};

export default Auction;
