import React from "react";

const AddCustomer = () => {
  return (
    <form className="ui form">
      <h4 className="ui dividing header">Shipping Information</h4>
      <div className="field">
        <label>Name</label>
        <div className="two fields">
          <div className="field">
            <input
              type="text"
              name="shipping[first-name]"
              placeholder="First Name"
            />
          </div>
          <div className="field">
            <input
              type="text"
              name="shipping[last-name]"
              placeholder="Last Name"
            />
          </div>
        </div>
      </div>
      <div className="field">
        <label>Billing Address</label>
        <div className="fields">
          <div className="twelve wide field">
            <input
              type="text"
              name="shipping[address]"
              placeholder="Street Address"
            />
          </div>
          <div className="four wide field">
            <input type="text" name="shipping[address-2]" placeholder="Apt #" />
          </div>
        </div>
      </div>
      <div className="one fields">
        <div className="field">
          <label>State</label>
          <select className="ui fluid dropdown">
            <option value>State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </div>
      <div className="ui button" tabIndex={0}>
        Submit Order
      </div>
    </form>
  );
};

export default AddCustomer;
