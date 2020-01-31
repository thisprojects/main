import React from 'react';
import SpaceStationSpotter from '../SpaceStationSpotterNative.js';
import renderer from 'react-test-renderer';

jest.mock('react-native-maps', () => {
  const { View } = require( 'react-native' );
  const MockMapView = ( props: any ) => {
    return <View>{ props.children }</View>;
  };
  const MockMarker = ( props: any ) => {
    return <View>{ props.children }</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

test('SpaceStationSpotter Matches Snapshot', () => {
  const component = renderer.create(
    <SpaceStationSpotter />,
  );
  let tree = component.toJSON();
  expect( tree ).toMatchSnapshot();
});
