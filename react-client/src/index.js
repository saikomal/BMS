import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import App from "./components/App";
import Header from "./components/Header";
import Customers from "./components/Customers";
import Admin from "./components/admin/Admin";
import Analytics from "./components/Analytics";
import Cart from "./components/Cart";

import history from "./history";
import reducers from "./reducers";

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStore(reducers, composeEnchancers(applyMiddleware()))}
    >
      <Router history={history}>
        {/* <Switch> */}
        <Header />
        <div>
          <Route path="/" exact component={App} />
          <Route path="/admin" component={Admin} />
          <Route path="/customers" component={Customers} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/cart" component={Cart} />
        </div>
        {/* </Switch> */}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
