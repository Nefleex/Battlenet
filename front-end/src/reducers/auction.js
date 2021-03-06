import {
  RECEIVE_AUCTIONS,
  EMPTY_AUCTIONS,
  LOAD_AUCTIONS,
  RECEIVE_DASHBOARD_AUCTIONS,
  SORT_AUCTIONS,
  SORT_AUCTIONS_ALPHABETICALLY,
  START_LOAD_AUCTION,
  END_LOAD_AUCTION,
  ERROR_LOAD_AUCTION
} from "../actions/auctionActionCreators";

export default function Auction(state = "", action) {
  const { payload, type, extra, k, error } = action;
  switch (type) {
    case START_LOAD_AUCTION:
      return {
        ...state,
        loading: true
      };
    case END_LOAD_AUCTION:
      return {
        ...state,
        loading: false
      };
    case ERROR_LOAD_AUCTION:
      return {
        ...state,
        error,
        loading: false
      };
    case RECEIVE_AUCTIONS:
      return {
        ...state,
        auctions: payload,
        extra,
        loading: false
      };
    case EMPTY_AUCTIONS:
      const newState = { ...state };
      delete newState.auctions;
      delete newState.extra;
      return "";

    case RECEIVE_DASHBOARD_AUCTIONS:
      return {
        ...state,
        dashboard: payload
      };

    case SORT_AUCTIONS:
      const sortByKey = (key, payload) => (a, b) => {
        if (payload === "ASC") {
          if (parseInt(a[key]) < parseInt(b[key])) {
            return 1;
          } else if (parseInt(a[key]) > parseInt(b[key])) {
            return -1;
          }
        } else if (payload === "DESC") {
          if (parseInt(a[key]) > parseInt(b[key])) {
            return 1;
          } else if (parseInt(a[key]) < parseInt(b[key])) {
            return -1;
          }
        }
      };
      const sorted = state.auctions.slice().sort(sortByKey(k, payload));
      return {
        ...state,
        auctions: sorted
      };

    case SORT_AUCTIONS_ALPHABETICALLY:
      const sortByKeyAlphabetic = (key, payload) => (a, b) => {
        if (payload === "ASC") {
          if (a[key] < b[key]) {
            return 1;
          } else if (a[key] > b[key]) {
            return -1;
          }
        } else if (payload === "DESC") {
          if (a[key] > b[key]) {
            return 1;
          } else if (a[key] < b[key]) {
            return -1;
          }
        }
      };
      const sortedA = state.auctions
        .slice()
        .sort(sortByKeyAlphabetic(k, payload));
      return {
        ...state,
        auctions: sortedA
      };

    default:
      return state;
  }
}

// const sortByKey = (key,payload) => (a, b) => {
//   if (parseInt(a[key]) > parseInt(b[key])) {
//     console.log("sorting +1");
//     return 1;
//   } else if (parseInt(a[key]) < parseInt(b[key])) {
//     console.log("sorting -1");
//     return -1;
//   } else {
//     console.log("failed sort");
//   }
// };
