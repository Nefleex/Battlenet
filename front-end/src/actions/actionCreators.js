export const LOAD_AUCTIONS = "LOAD_AUCTIONS";
export const RECEIVE_AUCTIONS = "RECEIVE_AUCTIONS";
export const LOAD_AUCTIONS_ERROR = "LOAD_AUCTIONS_ERROR";

export function loadAuctions() {
  return {
    type: LOAD_AUCTIONS
  };
}

export function receiveAuctions(data) {
  return {
    type: RECEIVE_AUCTIONS,
    payload: data
  };
}

export function loadError(error) {
  return {
    type: LOAD_AUCTIONS_ERROR,
    payload: error
  };
}
