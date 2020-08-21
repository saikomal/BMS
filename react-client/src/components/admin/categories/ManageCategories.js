import React, { useEffect, useState } from "react";
import { selectedAdminTab } from "../../../actions/admin";
import { getAllCategories } from "../../../actions/categories";
import { connect } from "react-redux";
import _ from "lodash";
import AddCategory from "./AddCategory";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const ManageCategories = (props) => {
  const [showAddModal, setShowAddModalProp] = useState(false);
  const [parentCategory, setParentCatProp] = useState("");
  const [breadCrumbList, setBreadCrumbList] = useState([]);
  const returnContextMenu = () => {
    return (
      <ContextMenu className="menu" id="add_same_id">
        <MenuItem
          onClick={this.handleClick}
          data={{ item: "Home" }}
          className="menuItem"
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={this.handleClick}
          data={{ item: "Post" }}
          className="menuItem"
        >
          Post
        </MenuItem>
        <MenuItem
          onClick={this.handleClick}
          data={{ item: "Create Post" }}
          className="menuItem"
        >
          Create Post
        </MenuItem>
        <MenuItem
          onClick={this.handleClick}
          data={{ item: "All Post" }}
          className="menuItem"
        >
          All Post
        </MenuItem>
        <MenuItem
          onClick={this.handleClick}
          data={{ item: "Stats" }}
          className="menuItem"
        >
          Stats
        </MenuItem>
        <MenuItem
          onClick={this.handleClick}
          data={{ item: "Chat" }}
          className="menuItem"
        >
          Chat
        </MenuItem>
        <MenuItem
          onClick={this.handleClick}
          data={{ item: "Settings" }}
          className="menuItem"
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={this.handleClick}
          data={{ item: "Profile" }}
          className="menuItem"
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={this.handleClick}
          data={{ item: "Logout" }}
          className="menuItem"
        >
          Logout
        </MenuItem>
      </ContextMenu>
    );
  };

  const showBreadCrumbs = () => {
    const l = breadCrumbList.length;
    if (l >= 1) {
      return (
        <div class="ui breadcrumb">
          <a
            class="section"
            onClick={() => {
              setParentCatProp("");
              setBreadCrumbList([]);
            }}
          >
            All
          </a>
          <div class="divider"> / </div>
          {_.transform(
            breadCrumbList.slice(0, l - 1),
            (res, name) => {
              res.push(
                <>
                  <a
                    class="section"
                    onClick={() => {
                      setParentCatProp(name);
                      setBreadCrumbList(
                        _.takeWhile(breadCrumbList, function (catName) {
                          return catName == name;
                        })
                      );
                    }}
                  >
                    {name}
                  </a>
                  <div class="divider"> / </div>
                </>
              );
            },
            []
          )}
          <a class="active section">{breadCrumbList[l - 1]}</a>
        </div>
      );
    } else {
      return (
        <div class="ui breadcrumb">
          <a class="section">All</a>
        </div>
      );
    }
  };

  useEffect(() => {
    props.selectedAdminTab("categories");
    props.getAllCategories();
  }, ["updateStore"]);

  const renderCategories = () => {
    console.log(parentCategory);
    return _.chain(props.catagories)
      .filter(function (o) {
        return o.parent == parentCategory;
      })
      .transform((result, o) => {
        result.push(
          <div
            className="column"
            key={o.id}
            onClick={() => {
              setParentCatProp(o.name);
              setBreadCrumbList([...breadCrumbList, o.name]);
            }}
          >
            <i class="folder icon huge" />{" "}
            <p style={{ marginLeft: 15 }}>{o.name}</p>
          </div>
        );
      }, [])
      .value();
  };
  return (
    <>
      <div className="ui internally celled grid">
        <div className="row">
          <div className="three wide column">Will decide what to show here</div>
          <div className="ten wide column">
            {showBreadCrumbs()}
            <div className="ui container">
              <div class="ui grid">
                <div className="eight column row">{renderCategories()}</div>
              </div>
            </div>
            {showAddModal && (
              <AddCategory
                closeModal={setShowAddModalProp}
                parentCategory={parentCategory}
              />
            )}
          </div>
          <div className="three wide column">
            <button
              className="ui button primary"
              onClick={() => setShowAddModalProp(true)}
            >
              Add Category
            </button>
            <br />
            <br />
            <button
              className="ui button primary"
              onClick={() => setShowAddModalProp(true)}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateTOProps = (state) => {
  return { catagories: state.allCategories };
};

export default connect(mapStateTOProps, { selectedAdminTab, getAllCategories })(
  ManageCategories
);
