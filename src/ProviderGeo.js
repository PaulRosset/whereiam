import React, { Component, createContext } from "react";
import axios from "axios";

const defaultValue = {};

const { Provider, Consumer } = createContext(defaultValue);

export const ConsumerGeo = Consumer;

class ProviderGeo extends Component {
  state = {
    address: "",
    time: 0,
    err: null
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          try {
            const responses = await axios.get(
              "https://api.opencagedata.com/geocode/v1/json?q=48.8582+2.3387&key=4f2e8ad1d18f451793dd42490f6156e1&no_annotations=1&language=en"
            );
            this.setState({
              address: responses.data.results[0].formatted,
              time: position.timestamp
            });
          } catch (err) {
            this.setState({
              err: err.message
            });
          }
        },
        err => {
          if (err) {
            this.setState({
              err: err.message
            });
          }
        },
        {
          enableHighAccuracy: true
        }
      );
    }
  }

  render() {
    return (
      <Provider
        value={{
          address: this.state.address,
          time: this.state.time,
          err: this.state.err
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default ProviderGeo;
