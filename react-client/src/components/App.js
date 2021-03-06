import React from "react";
import LeftMenu from "./Home/LeftMenu";

const App = () => {
  return (
    <div className="ui internally celled grid">
      <div className="row">
        <div className="three wide column">
          <LeftMenu />
        </div>
        <div className="ten wide column">
          <div className="ui card">
            <div className="content">
              <div className="header">Project Timeline</div>
            </div>
            <div className="content">
              <h4 className="ui sub header">Activity</h4>
              <div className="ui small feed">
                <div className="event">
                  <div className="content">
                    <div className="summary">
                      <a>Elliot Fu</a> added <a>Jenny Hess</a> to the project
                    </div>
                  </div>
                </div>
                <div className="event">
                  <div className="content">
                    <div className="summary">
                      <a>Stevie Feliciano</a> was added as an
                      <a>Administrator</a>
                    </div>
                  </div>
                </div>
                <div className="event">
                  <div className="content">
                    <div className="summary">
                      <a>Helen Troy</a> added two pictures
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="extra content">
              <button className="ui button">Join Project</button>
            </div>
          </div>
        </div>
        <div className="three wide column">
          <div className="ui feed">
            <div className="event">
              <div className="label">
                <i className="pencil icon" />
              </div>
              <div className="content">
                You added Elliot Fu to the group <a>Coworkers</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
