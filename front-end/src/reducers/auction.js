import {
  RECEIVE_AUCTIONS,
  EMPTY_AUCTIONS,
  LOAD_AUCTIONS,
  SORT_AUCTIONS
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
          } else {
          }
        } else if (payload === "DESC") {
          if (parseInt(a[key]) > parseInt(b[key])) {
            return 1;
          } else if (parseInt(a[key]) < parseInt(b[key])) {
            return -1;
          } else {
            console.log("failed sort");
          }
        }
      };
      const sorted = state.auctions.slice().sort(sortByKey(k, payload));
      return {
        ...state,
        auctions: sorted
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
