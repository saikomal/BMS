import React, { useEffect, useState } from "react";
import { selectedAdminTab } from "../../../actions/admin";
import { connect } from "react-redux";
import _ from "lodash";
import AddCategory from "./AddCategory";
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
  useEffect(() => {
    props.selectedAdminTab("categories");
  }, ["updateStore"]);

  const renderCategories = () => {
    return _.chain(data)
      .takeRightWhile(function (o) {
        return o.parent == parentCategory;
      })
      .transform((result, o) => {
        result.push(
          <div className="column" key={o.id}>
            <i class="folder icon huge" />{" "}
            <p style={{ marginLeft: 15 }}>{o.name}</p>
          </div>
        );
      }, [])
      .value();
  };
  return (
    <>
      <div className="ui masthead container">
        <div class="ui right floated main menu">
          <a
            class="music popup icon item"
            data-content="Play Music"
            onClick={() => setShowAddModalProp(true)}
          >
            <i class="plus square outline icon"></i>
          </a>
        </div>
      </div>
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
    </>
  );
};

export default connect(null, { selectedAdminTab })(ManageCategories);
