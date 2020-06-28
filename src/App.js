import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "../src/components/sellerApp/index";
import Store from "./Store";
// Main Routes file

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter basename="">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

