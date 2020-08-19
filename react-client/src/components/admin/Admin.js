import React, { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import CompanyDetailsForm from "./CompanyDetailsForm";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import ManageCategories from "./ManageCategories";
import ManageItems from "./ManageItems";

const aaa = () => {
  return <div> sdvajsfnvjfv</div>;
};
const Admin = () => {
  let { path, url } = useRouteMatch();
  return (
    <React.Fragment>
      <AdminHeader />
      <Route path={`${url}/`} exact component={CompanyDetailsForm} />
      <Route path={`${url}/items`} component={ManageItems} />
      <Route path={`${url}/categories`} component={ManageCategories} />
    </React.Fragment>
  );
};

export default Admin;
