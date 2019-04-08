//User related
export const START_LOAD_USER = "START_LOAD_USER";
export const END_LOAD_USER = "END_LOAD_USER";
export const ERROR_LOAD_USER = "ERROR_LOAD_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_TRACKING = "RECEIVE_TRACKING";

const loginUser = user => {
  return {
    type: LOGIN_USER,
    user
  };
};

const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

const startUserLogin = () => {
  return {
    type: START_LOAD_USER
  };
};

const loginError = error => {
  return {
    type: ERROR_LOAD_USER,
    error
  };
};

export function login(username, password, url) {
  return dispatch => {
    dispatch(startUserLogin());
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res.ok);
        if (res.ok) return res;
        else throw res;
      })
      .then(data => data.json())
      .then(json => {
        localStorage.setItem("token", json.token);
        localStorage.setItem("auctions_app_user", JSON.stringify(json));
        sessionStorage.setItem("token", json.token);
        sessionStorage.setItem("auctions_app_user", JSON.stringify(json));
        dispatch(loginUser(json));
        // history push authed component
      })
      .catch(async err => {
        const error = await err.text();
        console.log(error);
        dispatch(loginError(error));
      });
  };
}

export const logout = () => dispatch => {
  dispatch(logoutUser());
  localStorage.removeItem("token");
  localStorage.removeItem("auctions_app_user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("auctions_app_user");

  // history push "/"
};

// User tracking handling
const receiveTracking = data => {
  return {
    type: RECEIVE_TRACKING,
    payload: data
  };
};

const token = localStorage.getItem("token") || sessionStorage.getItem("token");
export const getTracking = () => dispatch => {
  fetch("http://localhost:3000/api/v1/users/track/auctions", {
    headers: new Headers({
      Authorization: `${token} `
    }),
    mode: "cors"
  })
    .then(data => data.json())
    .then(json => dispatch(receiveTracking(json)))
    .catch(err => console.log(err));
};

export const userFromStorage = user => dispatch => {
  dispatch(loginUser(user));
};
