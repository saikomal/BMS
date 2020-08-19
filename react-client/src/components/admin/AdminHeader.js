import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectedAdminTab } from "../../actions/admin";
import { Link, useRouteMatch } from "react-router-dom";

const AdminHeader = (props) => {
  let { path, url } = useRouteMatch();
  return (
    <div className="ui three item menu">
      <Link
        to={`${url}`}
        className="item active"
        onClick={() => props.selectedAdminTab("company")}
      >
        Company
      </Link>
      <Link
        to={`${url}/categories`}
        className="item"
        onClick={() => props.selectedAdminTab("categories")}
      >
        Categories
      </Link>
      <Link
        to={`${url}/items`}
        className="item"
        onClick={() => props.selectedAdminTab("items")}
      >
        Items
      </Link>
    </div>
  );
};

const mapStateTOProps = (state) => {
  return {
    activeTab: state.activeTab,
  };
};

export default connect(mapStateTOProps, { selectedAdminTab })(AdminHeader);
