import React from "react";
import { reduxForm, Field } from "redux-form";
import { render } from "@testing-library/react";

const AddCustomer = () => {
  const renderInput = ({ input, placeHolder, className }) => {
    return (
      <div className={className}>
        <input {...input} placeHolder={placeHolder} />
      </div>
    );
  };
  const renderSelect = ({ input }) => {
    return (
      <div className="field">
        <select className="ui fluid dropdown" {...input}>
          <option value>State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
      </div>
    );
  };
  return (
    <form className="ui form">
      <h4 className="ui dividing header">Customer Information</h4>
      <div className="field">
        <label>Name</label>
        <div className="two fields">
          <Field
            name="first-name"
            component={renderInput}
            placeHolder="First Name"
            className="field"
          />
          <Field
            name="last-name"
            component={renderInput}
            placeHolder="Last Name"
            className="field"
          />
        </div>
      </div>
      <div className="field">
        <label>Phone</label>
        <div className="two fields">
          <Field
            name="mobile"
            component={renderInput}
            placeHolder="Mobile"
            className="field"
          />
          <Field
            name="landline"
            component={renderInput}
            placeHolder="LandLine"
            className="field"
          />
        </div>
      </div>
      <div className="field">
        <label>Billing Address</label>
        <div className="fields">
          <Field
            name="address1"
            component={renderInput}
            placeHolder="Street Address"
            className="twelve wide field"
          />
          <Field
            name="address2"
            component={renderInput}
            placeHolder="Apt #"
            className="four wide field"
          />
        </div>
      </div>
      <div className="one fields">
        <Field name="state" component={renderSelect} />
      </div>
      <div className="ui button" tabIndex={0}>
        Submit Order
      </div>
    </form>
  );
};

export default reduxForm({ form: "CustomerCreate" })(AddCustomer);
