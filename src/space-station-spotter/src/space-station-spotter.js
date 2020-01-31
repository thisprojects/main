import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import {
  callSpaceStationApi,
  getResults,
  key
} from "./js-functions/js-functions";
import { OverLay, DisplayResults } from "./components/components.js";
import "./space-station.css";

export class SpaceStationSpotter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 52.489471,
      lng: -1.898575,
      locationError: false,
      spaceStationResults: null,
      overlayState: true
    };
  }
  render() {
    const toggleLoadingAnimation = () => {
      let x = document.querySelector(".loading");
      x.classList.toggle("toggle-hide");
    };

    const setOverlayState = state => {
      this.setState({ overlayState: state });
    };

    const setLocation = async source => {
      toggleLoadingAnimation();
      let locationResult = await getResults(source).catch(e => { 
                                                                this.setState({ locationError: true })
                                                                toggleLoadingAnimation();
                                                              });
      // If a valid location is returned, set lat and lng then set call space station api. If location is invalid, display errors.
      if (locationResult && locationResult.lat && locationResult.lng) {
        this.setState({
          lat: locationResult.lat,
          lng: locationResult.lng,
          spaceStationResults: await callSpaceStationApi(
            locationResult.lat,
            locationResult.lng
          ).catch(e => e)
        });
        setOverlayState(false);
        toggleLoadingAnimation();
      } else {
        this.setState({ locationError: true });
      }
    };

    return (
      <div id="page-wrapper">
        <OverLay
          overlayState={this.state.overlayState}
          submitLocation={setLocation}
          locationError={this.state.locationError}
        />
        <div id="map" className="map">
          <Map
            initialCenter={{
              lat: 52.489471,
              lng: -1.898575
            }}
            center={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
            google={this.props.google}
            zoom={3}
            className={"map"}
          >
            <Marker
              position={{ lat: this.state.lat, lng: this.state.lng }}
              name={"Current location"}
            />
          </Map>
          <DisplayResults
            reset={setOverlayState}
            results={this.state.spaceStationResults}
          />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key
})(SpaceStationSpotter);
