import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Auctions from "./components/Auctions";

const Comp1 = () => {
  return <div>This is component 1</div>;
};
const Comp2 = () => {
  return <div>This is component 2</div>;
};
const Comp3 = () => {
  return <div>This is component 3</div>;
};
const Comp4 = () => {
  return <div>This is component 4</div>;
};
const App = () => (
  <BrowserRouter>
    <Fragment>
      <Layout />
      <Switch>
        <Route exact path="/" component={Comp1} />
        <Route exact path="/2" component={Comp2} />
        <Route exact path="/3" component={Comp3} />
        <Route exact path="/auctions" component={Auctions} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default App;
