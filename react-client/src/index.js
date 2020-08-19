import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";

import App from "./components/App";
import Header from "./components/Header";
import Customers from "./components/Customers";
import Admin from "./components/admin/Admin";
import Analytics from "./components/Analytics";
import Cart from "./components/Cart";

import history from "./history";

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Header />
      <div>
        <Route path="/" exact component={App} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/customers" exact component={Customers} />
        <Route path="/analytics" exact component={Analytics} />
        <Route path="/cart" exact component={Cart} />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
