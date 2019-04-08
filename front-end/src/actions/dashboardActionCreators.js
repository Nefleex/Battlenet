export const START_LOAD_DASHBOARD = "START_LOAD_DASHBOARD";
export const RECEIVE_DASHBOARD = "RECEIVE_DASHBOARD";
export const LOAD_ERROR_DASHBOARD = "LOAD_ERROR_DASHBOARD";
export const STOP_LOAD_DASHBOARD = "STOP_LOAD_DASHBOARD";

const startLoadDashboard = () => {
  return {
    type: START_LOAD_DASHBOARD
  };
};

const dashboardError = error => {
  return {
    type: LOAD_ERROR_DASHBOARD,
    error
  };
};

const receiveDashboard = data => {
  return {
    type: RECEIVE_DASHBOARD,
    response: data
  };
};

const stopLoadDashboard = () => {
  return {
    type: STOP_LOAD_DASHBOARD
  };
};

export const getDashboard = url => dispatch => {
  dispatch(startLoadDashboard());
  console.log("before fetch");
  fetch(url)
    .then(res => {
      console.log("after fetch");
      console.log(res);
      if (res.ok) return res;
      else throw res;
    })
    .then(data => data.json())
    .then(json => dispatch(receiveDashboard(json)))
    .catch(async err => {
      try {
        console.log(err);
        if (!error) {
          dispatch(stopLoadDashboard());
          return;
        }
        const error = await err.text();
        console.log(error);
        dispatch(dashboardError(error));
      } catch (err) {
        console.log(err);
      }
    });
};
