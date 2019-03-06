import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Layout} />
    </Switch>
  </BrowserRouter>
);

export default App;
