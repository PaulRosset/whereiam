import React, { Component } from "react";
import "./App.css";
import { FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import ProviderGeo, { ConsumerGeo } from "./ProviderGeo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FaMapMarkerAlt className="Marker" color="#2185d0" size="3em" />
        <div className="wrapperInfo">
          <ProviderGeo>
            <ConsumerGeo>
              {({ address, time, err, isLoading }) =>
                isLoading ? (
                  <i className="fa fa-cog fa-spin Spinner" />
                ) : (
                  <div className="Information">
                    {err ? (
                      err
                    ) : (
                      <div>
                        <p className="lastPosition">
                          Your last position at {new Date(time).toTimeString()}:
                        </p>
                        {address}
                      </div>
                    )}
                  </div>
                )
              }
            </ConsumerGeo>
          </ProviderGeo>
        </div>
        <div className="wrapperAddInfos">
          no bullshit, no tracking, just the information.
          <div className="github">
            <a
              href="https://github.com/PaulRosset/whereiam"
              className="githubClick"
            >
              <FaGithub size="1.5em" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
