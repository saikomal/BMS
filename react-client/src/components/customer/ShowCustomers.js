import React from "react";

const ShowCustomers = () => {
  return (
    <div className="ui list">
      <div className="item">
        <i className="user icon" />
        <div className="content">
          <a className="header">Rachel</a>
          <div className="description">
            Last seen watching{" "}
            <a>
              <b>Arrested Development</b>
            </a>{" "}
            just now.
          </div>
        </div>
      </div>
      <div className="item">
        <i className="user icon" />
        <div className="content">
          <a className="header">Lindsay</a>
          <div className="description">
            Last seen watching{" "}
            <a>
              <b>Bob's Burgers</b>
            </a>{" "}
            10 hours ago.
          </div>
        </div>
      </div>
      <div className="item">
        <i className="user icon" />
        <div className="content">
          <a className="header">Matthew</a>
          <div className="description">
            Last seen watching{" "}
            <a>
              <b>The Godfather Part 2</b>
            </a>{" "}
            yesterday.
          </div>
        </div>
      </div>
      <div className="item">
        <i className="user icon" />
        <div className="content">
          <a className="header">Jenny Hess</a>
          <div className="description">
            Last seen watching
            <a>
              <b>Twin Peaks</b>
            </a>
            3 days ago.
          </div>
        </div>
      </div>
      <div className="item">
        <i className="user icon" />
        <div className="content">
          <a className="header">Veronika Ossi</a>
          <div className="description">Has not watched anything recently</div>
        </div>
      </div>
    </div>
  );
};

export default ShowCustomers;
