import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Auctions from "./components/Auctions";

const Home = () => {
  return <div>Home</div>;
};

const Dashboard = () => {
  return <div>Dashboard</div>;
};

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Layout />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/auctions" component={Auctions} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default App;
