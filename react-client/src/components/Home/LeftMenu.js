import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { getAllCategories } from "../../actions/categories";

const LeftMenu = (props) => {
  useEffect(() => {
    props.getAllCategories();
  }, []);
  const menuItems = () => {
    return _.chain(props.catagories)
      .filter((cat) => {
        return cat.parent == "";
      })
      .transform((res, cat) => {
        res.push(
          <a className="active teal item">
            {cat.name}
            <div className="ui teal left pointing label">1</div>
          </a>
        );
      }, [])
      .value();
  };
  return (
    <div className="ui vertical menu">
      <div className="item">
        <div className="ui transparent icon input">
          <input type="text" placeholder="Search mail..." />
          <i className="search icon" />
        </div>
      </div>
      <a className="active teal item">
        Inbox
        <div className="ui teal left pointing label">1</div>
      </a>
      <a className="item">
        Spam
        <div className="ui label">51</div>
      </a>
      <a className="item">
        Updates
        <div className="ui label">1</div>
      </a>
      {menuItems()}
    </div>
  );
};
const mapStateTOProps = (state) => {
  return { catagories: state.allCategories };
};
export default connect(mapStateTOProps, { getAllCategories })(LeftMenu);
