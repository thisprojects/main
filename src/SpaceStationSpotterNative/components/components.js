import React from "react";
import { unixTimeConverter } from "./../js-functions/js-functions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard
} from "react-native";
import { styles } from "../styles/styles";

export const Errors = props => {
  return (
    <View>
      {props.locationError ? (
        <Text style={styles.error}>GeoLocation Time Out</Text>
      ) : null}
    </View>
  );
};

export const OverLay = props => {
  return (
    <View
      style={props.overlayState ? { display: "flex" } : { display: "none" }}
    >
      <View style={styles.overLay}>
        <Text style={styles.header}>Space Station Spotter</Text>
        <MaterialCommunityIcons
          name="satellite-uplink"
          size={80}
          color="lightgray"
        />
        <GeoCode submitLocation={props.submitLocation} />
        <Errors locationError={props.locationError} />
        <View
          style={props.loadingState ? { display: "flex" } : { display: "none" }}
        >
          <ActivityIndicator
            style={styles.loadingSpinner}
            size="large"
            color="white"
          />
        </View>
      </View>
    </View>
  );
};

export const GeoCode = props => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.submitLocation("geo");
          Keyboard.dismiss();
        }}
      >
        <Text style={styles.textProperties}>Start Spotting!</Text>
      </TouchableOpacity>
    </View>
  );
};

export const MapResults = props => {
  return props.results.map((pass, index) => (
    <View style={styles.mapResults} key={index}>
      <Text style={styles.mapResultsText}>
        <Text>{index + 1} </Text>
        <MaterialCommunityIcons
          style={styles.mapResultClockIcon}
          name="clock-outline"
          size={20}
          color="lightgray"
        />
        {unixTimeConverter(pass.risetime)}
      </Text>
    </View>
  ));
};

export const DisplayResults = props => {
  if (Array.isArray(props.results)) {
    return (
      <View style={styles.results}>
        <Text style={styles.textProperties}>
          {props.address || "Your Current Location"}
        </Text>
        <MapResults results={props.results} />
        <ChooseAnotherLocation reset={props.reset} />
      </View>
    );
  } else {
    // if props.results is not an array it could mean we have received an error message, as a string literal
    return (
      <View>
        {props.results ? (
          <View style={styles.results}>
            <Text style={styles.error}>Space Station Api Error</Text>
            <Text style={styles.errorSpaceStationReason}>{props.results}</Text>
            <ChooseAnotherLocation reset={props.reset} />
          </View>
        ) : null}
      </View>
    );
  }
};

export const ChooseAnotherLocation = props => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        style={[styles.button, styles.chooseAnotherLocation]}
        onPress={() => props.reset(true)}
      >
        <Text style={[styles.textProperties, styles.anotherLocationText]}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};
