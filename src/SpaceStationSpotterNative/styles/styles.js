import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  mapStyle: {
    zIndex: 0,
    top: 0,
    left: 0,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100
  },
  overLay: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    display: "flex",
    backgroundColor: "rgba(1, 1, 1, 0.95)",
    top: 0,
    paddingTop: 120,
    alignItems: "center"
  },
  results: {
    position: "absolute",
    top: Dimensions.get("window").height - 220,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "gray"
  },
  textProperties: {
    color: "gray",
    padding: 10,
    fontSize: 17
  },
  button: {
    color: "gray",
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 60,
    paddingRight: 60,
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    borderRadius: 10
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  locationInputWrapper: {
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    marginBottom: 10
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    color: "lightgray"
  },
  error: {
    padding: 10,
    color: "red",
    fontSize: 20
  },
  errorSpaceStationReason: {
    fontSize: 15,
    color: "red",
    padding: 5
  },
  chooseAnotherLocation: {
    backgroundColor: "lightgray"
  },
  anotherLocationText: {
    color: "dimgray"
  },
  loadingSpinner: {
    padding: 20
  },
  mapResultsText: {
    color: "gray",
    fontSize: 20
  },
  locationInput: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 60,
    paddingRight: 60
  }
});
