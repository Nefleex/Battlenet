import axios from "axios";

export const START_LOAD = "START_LOAD";
export const RECEIVE_AUCTIONS = "RECEIVE_AUCTIONS";
export const EMPTY_AUCTIONS = "EMPTY_AUCTIONS";
export const LOAD_ERROR = "LOAD_ERROR";

export function loading() {
  return {
    type: START_LOAD
  };
}
export function receiveAuctions(data, extra) {
  return {
    type: RECEIVE_AUCTIONS,
    payload: data,
    extra
  };
}
export function emptyAuctions() {
  return {
    type: EMPTY_AUCTIONS
  };
}
export function loadError(error) {
  return {
    type: LOAD_ERROR,
    error: error
  };
}

const handleError = (response, dispatch) => {
  if (response.ok) {
    return response.json();
  }

  response
    .text()
    .then(error => {
      dispatch(loadError(error));
    })
    .catch(err => console.log(err));
};

export const getData = (where, param) => {
  where = where.toLowerCase();
  param = param.toLowerCase();
  return dispatch => {
    dispatch(loading());
    return fetch(
      `http://localhost:3000/api/v1/auctions/by_${where}/?${where}=${param}`
    )
      .then(response => handleError(response, dispatch))
      .then(data => {
        dispatch(receiveAuctions(data.auctions, data.extra));
      })
      .catch(err => console.log(err));
  };
};
