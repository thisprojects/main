import React from 'react';
import { SpaceStationSpotter } from '../space-station-spotter.js';
import renderer from 'react-test-renderer';

test('SpaceStationSpotter Matches Snapshot', () => {
  const component = renderer.create(
    <SpaceStationSpotter />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
