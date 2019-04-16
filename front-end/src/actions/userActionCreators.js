//User related
export const START_LOAD_USER = "START_LOAD_USER";
export const END_LOAD_USER = "END_LOAD_USER";
export const ERROR_USER = "ERROR_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_TRACKING = "RECEIVE_TRACKING";
export const APPEND_TRACKING = "APPEND_TRACKING";
export const REMOVE_TRACKING = "REMOVE_TRACKING";

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
    type: ERROR_USER,
    error
  };
};
export const userError = error => dispatch => {
  dispatch(loginError(error));
};

export function login(username, password, url) {
  return async dispatch => {
    try {
      dispatch(startUserLogin());
      const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(result.ok);
      if (result.ok) {
        const data = await result.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("auctions_app_user", JSON.stringify(data));
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("auctions_app_user", JSON.stringify(data));
        dispatch(loginUser(data));
      } else {
        throw result;
      }
    } catch (err) {
      const error = await err.text();
      console.log(error);
      dispatch(loginError(error));
    }
  };
}

export const logout = () => dispatch => {
  console.log("logging out");
  dispatch(logoutUser());
  localStorage.removeItem("token");
  localStorage.removeItem("auctions_app_user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("auctions_app_user");
};

// User tracking handling
const receiveTracking = data => {
  return {
    type: RECEIVE_TRACKING,
    payload: data
  };
};

export const postTracking = (url, toAdd) => async dispatch => {
  toAdd = toAdd.map(add => add.owner);
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token") ||
          sessionStorage.getItem("token")} `
      }),
      body: JSON.stringify({ data: toAdd })
    });
    const json = await result.json();
    console.log(json);
    dispatch(getTracking());
  } catch (err) {
    console.log(err);
  }
};

export const getTracking = () => async dispatch => {
  try {
    console.log(localStorage.getItem("token"));
    const result = await fetch(
      "http://localhost:3000/api/v1/users/track/auctions",
      {
        headers: new Headers({
          Authorization: `${localStorage.getItem("token") ||
            sessionStorage.getItem("token")} `
        }),
        mode: "cors"
      }
    );
    const data = await result.json();
    dispatch(receiveTracking(data));
    return data;
  } catch (err) {
    dispatch(logout());
  }
};

const removeTracking = payload => {
  return {
    type: REMOVE_TRACKING,
    payload
  };
};

// export const deleteTracking = payload => dispatch => {
//   dispatch(removeTracking(payload));
// };

export const userFromStorage = user => dispatch => {
  dispatch(loginUser(user));
};

export const deleteTracking = (url, owners) => async dispatch => {
  console.log(owners);
  try {
    const result = await fetch(url, {
      method: "DELETE",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token") ||
          sessionStorage.getItem("token")} `
      }),
      body: JSON.stringify({ data: owners })
    });
    const json = await result.json();
    console.log(json);
    dispatch(removeTracking(json.deleted));
    return json.owners;
  } catch (err) {
    console.log(err);
  }
};
