import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectedAdminTab } from "../../actions/admin";

const ManageItems = (props) => {
  useEffect(() => {
    props.selectedAdminTab("items");
  }, ["updateStore"]);
  return <div> Manage Items </div>;
};

export default connect(null, { selectedAdminTab })(ManageItems);
