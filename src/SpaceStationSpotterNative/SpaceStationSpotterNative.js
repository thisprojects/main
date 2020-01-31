import React, { Component } from "react";
import { View } from "react-native";
import { styles } from "./styles/styles";
import { OverLay, DisplayResults } from "./components/components.js";
import { callSpaceStationApi, GeoLocation } from "./js-functions/js-functions";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default class SpaceStationSpotterNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 52.489471,
      lng: -1.898575,
      locationError: false,
      spaceStationResults: null,
      overlayState: true,
      address: null,
      loadingState: false
    };
  }
  render() {
    const setOverlayState = state => {
      this.setState({ overlayState: state });
    };

    const setLocation = async () => {
      this.setState({ loadingState: true });
      let locationResult = await GeoLocation();
      // If a valid location is returned, set lat and lng then set call space station api. If location is invalid, display errors.
      if (locationResult && locationResult.lat) {
        this.setState({
          lat: locationResult.lat,
          lng: locationResult.lng,
          spaceStationResults: await callSpaceStationApi(
            locationResult.lat,
            locationResult.lng
          ).catch(e => e)
        });
        setOverlayState(false);
        this.setState({ loadingState: false });
      } else {
        this.setState({ locationError: true, loadingState: false });
      }
    };

    return (
      <View>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 52.489471,
            longitude: -1.898575,
            latitudeDelta: 40.0922,
            longitudeDelta: 40.0421
          }}
          region={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 40.0922,
            longitudeDelta: 40.0421
          }}
        >
          <Marker
            coordinate={{
              latitude: this.state.lat,
              longitude: this.state.lng
            }}
            title={"Map"}
            description={"Marker"}
          />
        </MapView>
        <DisplayResults
          style={{ zIndex: 1 }}
          results={this.state.spaceStationResults}
          reset={setOverlayState}
          address={this.state.address}
        />
        <OverLay
          style={{ zIndex: 10 }}
          submitLocation={setLocation}
          overlayState={this.state.overlayState}
          locationError={this.state.locationError}
          loadingState={this.state.loadingState}
        />
      </View>
    );
  }
}
