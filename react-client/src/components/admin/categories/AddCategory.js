import React from "react";
import ReactDOM from "react-dom";
import { reduxForm, Field } from "redux-form";

const AddCategory = (props) => {
  const renderInput = ({ input, label }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  };

  const postCatDetails = (data) => {
    console.log(data);
  };

  return ReactDOM.createPortal(
    <div className="ui dimmer modals active">
      <div className="ui standard modal visible active">
        <div className="header">Add Category</div>
        <div className="content">
          <form
            className="ui form"
            onSubmit={props.handleSubmit(postCatDetails)}
          >
            <Field name="name" component={renderInput} label="Category Name" />
            <Field
              name="description"
              component={renderInput}
              label="Description"
            />
            <div className="actions">
              <button className="ui button primary" type="submit">
                Submit
              </button>
              <button
                className="ui button red"
                onClick={() => {
                  props.closeModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default reduxForm({
  form: "addCategory",
})(AddCategory);
