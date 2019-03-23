import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Auctions from "./components/Auctions";
import Dashboard from "./components/Dashboard";

const Home = () => {
  return <div>Home</div>;
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
