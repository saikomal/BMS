import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary  menu">
      <Link to="/" className="item active">
        Home
      </Link>
      <Link to="/customers" className="item">
        Customers
      </Link>
      <Link to="/cart" className="item">
        Cart
      </Link>
      <Link to="/analytics" className="item">
        Analytics
      </Link>
      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i className="search link icon"></i>
          </div>
        </div>
        <Link to="/admin" className="ui item">
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Header;
