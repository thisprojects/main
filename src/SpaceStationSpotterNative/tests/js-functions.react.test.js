import {
  unixTimeConverter,
  callSpaceStationApi,
  GeoLocation
} from "../js-functions/js-functions.js";
import { mockResultString, mockGeolocation } from "../tests/mocked-results.js";

let response = "Mocked Space Station Response";
let reason = "Mocked Space Station Error Reason";

let mockApiResponse = {
  response: response,
  reason: reason,
  results: [
    {
      geometry: {
        location: mockResultString
      }
    }
  ]
};

let json = () => mockApiResponse;

global.fetch = () => {
  return new Promise((res, rej) => {
    return res({
      json
    });
  });
};

global.navigator.geolocation = mockGeolocation;

test("Space Station APi Call Valid Results", async () => {
  let x = await callSpaceStationApi(1, 2);
  expect(x).toEqual(response);
});

test("Space Station APi Call invalid Results - known error", async () => {
  mockApiResponse.response = null;
  let x = await callSpaceStationApi(1, 2);
  expect(x).toEqual(reason);
});

test("Space Station APi Call invalid Results - unknown error", async () => {
  mockApiResponse.reason = null;
  let x = await callSpaceStationApi(1, 2);
  expect(x).toEqual("Unknown Error");
});

test("Unix Time Conversion", () => {
  let x = unixTimeConverter(1580051829);
  expect(x).toEqual(" 26 / Jan / 2020  at  15:17:09");
});

test("GeoLocation", async () => {
  let x = await GeoLocation();
  expect(x).toEqual({ lat: 1, lng: 1 });
});
