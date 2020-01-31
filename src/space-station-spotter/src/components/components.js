import React from "react";
import { unixTimeConverter } from "./../js-functions/js-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faSatelliteDish } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Errors = props => {
  return (
    <div className="location-error">
      {props.locationError ? (
        <p>Error - Location Unavailable Or Unable To Acquire Geolocation</p>
      ) : null}
    </div>
  );
};

export const OverLay = props => {
  return (
    <div
      className="overlay"
      style={props.overlayState ? { display: "flex" } : { display: "none" }}
    >
      <h1>Space Station Spotter</h1>
      <span className="icon">
        <FontAwesomeIcon icon={faSatelliteDish} size="3x" />
      </span>
      <GeoCode submitLocation={props.submitLocation} />
      <h2>Or</h2>
      <span className="controls">
        <LocationInput />
        <SubmitButton submitLocation={props.submitLocation} />
      </span>
      <Errors locationError={props.locationError} />
      <div className="loading toggle-hide">
        <FontAwesomeIcon icon={faSpinner} size="3x" spin />
      </div>
    </div>
  );
};

export const GeoCode = props => {
  return (
    <div className="geocode">
      <button onClick={() => props.submitLocation("geo")}>
        Use Current Location
      </button>
    </div>
  );
};

export const MapResults = props => {
  return props.results.map((pass, index) => (
    <div className="result-row" key={index}>
      <p key={index + 1}>
        {index + 1}
        <span>
          <FontAwesomeIcon icon={faClock} />
        </span>
        {unixTimeConverter(pass.risetime)}
      </p>
    </div>
  ));
};

export const DisplayResults = props => {
  if (Array.isArray(props.results)) {
    return (
      <div className="results">
        <MapResults results={props.results} />
        <ChooseAnotherLocation reset={props.reset} />
      </div>
    );
  } else {
    return (
      <div>
        {props.results ? (
          <div className="space-api-error">
            <p>Space Station Api Error</p>
            <p>{props.results}</p>
            <div>
              <ChooseAnotherLocation reset={props.reset} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};

export const LocationInput = () => {
  return (
    <div className="location-input-wrapper">
      <input id="location-input" type="text" placeholder="Choose Location" />
    </div>
  );
};

export const SubmitButton = props => {
  return (
    <div className="submit-button">
      <button onClick={() => props.submitLocation("api")}>Submit</button>
    </div>
  );
};

export const ChooseAnotherLocation = props => {
  return (
    <div className="choose-another-location">
      <button onClick={() => props.reset(true)}>Choose Another Location</button>
    </div>
  );
};
