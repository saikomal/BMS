import React, { useEffect, useState } from "react";
import { selectedAdminTab } from "../../../actions/admin";
import { connect } from "react-redux";
import _ from "lodash";
import AddCategory from "./AddCategory";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
const data = [
  //sample data
  { id: 1, name: "Samsung", parent: "TV" },
  { id: 2, name: "Sony", parent: "TV" },
  { id: 3, name: "LG", parent: "TV" },
  { id: 4, name: "ONe Pluss", parent: "TV" },
  { id: 5, name: "Onida", parent: "TV" },
  { id: 10, name: "TV", parent: "" },
  { id: 11, name: "AC", parent: "" },
  { id: 12, name: "WashingMachine", parent: "" },
  { id: 13, name: "AC1", parent: "" },
  { id: 14, name: "AC2", parent: "" },
  { id: 15, name: "AC3", parent: "" },
  { id: 16, name: "AC4", parent: "" },
  { id: 17, name: "AC5", parent: "" },
  { id: 18, name: "AC6", parent: "" },
  { id: 19, name: "AC7", parent: "" },
  { id: 20, name: "AC8", parent: "" },
  { id: 21, name: "AC9", parent: "" },
  { id: 22, name: "AC0", parent: "" },
  { id: 23, name: "AC11", parent: "" },
  { id: 24, name: "AC12", parent: "" },
];

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
  }, ["updateStore"]);

  const renderCategories = () => {
    console.log(parentCategory);
    return _.chain(data)
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

export default connect(null, { selectedAdminTab })(ManageCategories);
