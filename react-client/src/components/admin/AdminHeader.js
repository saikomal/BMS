import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectedAdminTab } from "../../actions/admin";
import { Link, useRouteMatch } from "react-router-dom";
import history from "../../history";

const AdminHeader = (props) => {
  const { path, url } = useRouteMatch();

  // useEffect(() => {
  //   console.log(props);
  //   if (props.activeTab == "categories") {
  //     history.push(`${url}/categories`);
  //   } else if (props.activeTab == "company") {
  //     history.push(url);
  //   } else {
  //     history.push(`${url}/items`);
  //   }
  // }, ["moveToLastOpenedTab"]);

  return (
    <div className="ui three item menu">
      <Link
        to={`${url}`}
        className={`item ${props.activeTab === "company" ? "active" : ""}`}
      >
        Company
      </Link>
      <Link
        to={`${url}/categories`}
        className={`item ${props.activeTab === "categories" ? "active" : ""}`}
        onClick={() => props.selectedAdminTab("categories")}
      >
        Categories
      </Link>
      <Link
        to={`${url}/items`}
        className={`item ${props.activeTab === "items" ? "active" : ""}`}
        onClick={() => props.selectedAdminTab("items")}
      >
        Items
      </Link>
    </div>
  );
};

const mapStateTOProps = (state) => {
  return {
    activeTab: state.activeAdminTab,
  };
};

export default connect(mapStateTOProps, { selectedAdminTab })(AdminHeader);
