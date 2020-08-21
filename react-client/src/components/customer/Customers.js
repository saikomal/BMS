import React from "react";
import AddCustomer from "./AddCustomer";
import ShowCustomers from "./ShowCustomers";
const Customers = () => {
  return (
    <div className="ui internally celled grid">
      <div className="row">
        <div className="eleven wide column">
          <AddCustomer />
        </div>
        <div className="five wide column">
          <ShowCustomers />
        </div>
      </div>
    </div>
  );
};

export default Customers;
