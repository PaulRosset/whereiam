import React, { Component, createContext } from "react";
import axios from "axios";

const { Provider, Consumer } = createContext({});

export const ConsumerGeo = Consumer;

class ProviderGeo extends Component {
  state = {
    address: "",
    time: 0,
    err: null,
    lat: 0,
    long: 0,
    isLoading: true
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.id = navigator.geolocation.watchPosition(
        async position => {
          try {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            if (lat !== this.state.lat && long !== this.state.long) {
              this.setState({ isLoading: true });
              const responses = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${
                  process.env.REACT_APP_API_KEY
                }&no_annotations=1&language=en`
              );
              this.setState(
                {
                  lat: position.coords.latitude,
                  long: position.coords.longitude,
                  address: responses.data.results[0].formatted,
                  time: position.timestamp
                },
                () => {
                  this.setState({ isLoading: false });
                }
              );
            }
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
          err: this.state.err,
          isLoading: this.state.isLoading
        }}
      >
        {this.props.children}
      </Provider>
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.id);
  }
}

export default ProviderGeo;
