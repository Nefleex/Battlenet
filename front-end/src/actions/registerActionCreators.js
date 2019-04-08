export const REGISTER_USER_RESPONSE = "REGISTER_USER_RESPONSE";
export const START_REGISTER_USER = "START_REGISTER_USER";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const CLEAR_REGISTER_MESSAGES = "CLEAR_REGISTER_MESSAGES";

const registerError = error => {
  return {
    type: REGISTER_ERROR,
    error
  };
};

const registerResponse = res => {
  return {
    type: REGISTER_USER_RESPONSE,
    response: res
  };
};

const startRegister = () => {
  return {
    type: START_REGISTER_USER
  };
};

const clearMessages = () => {
  return {
    type: CLEAR_REGISTER_MESSAGES
  };
};

export const register = (username, password, url) => dispatch => {
  dispatch(clearMessages());
  dispatch(startRegister());
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) return res;
      else throw res;
    })
    .then(res => res.text())
    .then(data => {
      console.log(data);
      dispatch(registerResponse(data));
    })
    .catch(async err => {
      try {
        const error = await err.text();
        console.log("Error:");
        console.log(error);
        dispatch(registerError(error));
      } catch (err) {
        console.log(err);
      }
    });
};
