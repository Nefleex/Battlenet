import {
  RECEIVE_AUCTIONS,
  EMPTY_AUCTIONS,
  LOAD_AUCTIONS,
  SORT_AUCTIONS,
  SORT_AUCTIONS_ALPHABETICALLY
} from "../actions/actionCreators";
import { stat } from "fs";
// import { initialState } from "./index";

export default function Auction(state = "", action) {
  const { payload, type, extra, k } = action;
  switch (type) {
    case RECEIVE_AUCTIONS:
      return {
        ...state,
        auctions: payload,
        extra
      };
    case EMPTY_AUCTIONS:
      return { ...state, auctions: null, extra: null };

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
