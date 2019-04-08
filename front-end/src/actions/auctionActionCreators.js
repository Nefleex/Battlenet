export const START_LOAD_AUCTION = "START_LOAD_AUCTION";
export const END_LOAD_AUCTION = "END_LOAD_AUCTION";
export const ERROR_LOAD_AUCTION = "ERROR_LOAD_AUCTION";
export const RECEIVE_AUCTIONS = "RECEIVE_AUCTIONS";
export const EMPTY_AUCTIONS = "EMPTY_AUCTIONS";
export const UPDATE_AUCTIONS = "UPDATE_AUCTIONS";
export const SORT_AUCTIONS = "SORT_AUCTIONS";
export const SORT_AUCTIONS_ALPHABETICALLY = "SORT_AUCTIONS_ALPHABETICALLY";
export const RECEIVE_DASHBOARD_AUCTIONS = "RECEIVE_DASHBOARD_AUCTIONS";

export function startLoad() {
  return {
    type: START_LOAD_AUCTION
  };
}
function receiveAuctions(data, extra) {
  return {
    type: RECEIVE_AUCTIONS,
    payload: data,
    extra
  };
}
function stopLoading() {
  return {
    type: END_LOAD_AUCTION
  };
}

function receiveDashboard(payload) {
  return {
    type: RECEIVE_DASHBOARD_AUCTIONS,
    payload
  };
}

export function emptyAuctions() {
  return {
    type: EMPTY_AUCTIONS
  };
}
export function loadError(error) {
  return {
    type: ERROR_LOAD_AUCTION,
    error: error
  };
}

export function sortActions(k, payload) {
  return {
    type: SORT_AUCTIONS,
    payload,
    k
  };
}
export function sortActionsAlphabetically(k, payload) {
  return {
    type: SORT_AUCTIONS_ALPHABETICALLY,
    payload,
    k
  };
}

const handleError = (response, dispatch) => {
  if (response.ok) return response;

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
    dispatch(startLoad());
    return fetch(
      `http://localhost:3000/api/v1/auctions/by_${where}/?${where}=${param}`
    )
      .then(response => handleError(response, dispatch))
      .then(response => response.json())
      .then(data => {
        dispatch(receiveAuctions(data.auctions, data.extra));
      })
      .catch(err => console.log(err));
  };
};

export const getDashboard = () => {
  return dispatch => {
    dispatch(startLoad());
    return fetch(`http://localhost:3000/api/v1/auctions/dashboard`)
      .then(response => handleError(response, dispatch))
      .then(response => response.json())
      .then(data => {
        dispatch(receiveDashboard(data));
        dispatch(stopLoading());
      })
      .catch(err => console.log(err));
  };
};
