import React from 'react';
import { 
  Errors,
  OverLay,
  GeoCode,
  MapResults,
  DisplayResults,
  LocationInput,
  SubmitButton,
  ChooseAnotherLocation,
} from '../components/components.js';
import renderer from 'react-test-renderer';
import {
  mockedResultsArray,
} from './mocked-results.js';

test('Errors Matches Snapshot', () => {
  const component = renderer.create(
    <Errors />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Overlay Matches Snapshot', () => {
  const component = renderer.create(
    <OverLay />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('GeoCode Matches Snapshot', () => {
  const component = renderer.create(
    <GeoCode />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('MapResults Matches Snapshot', () => {
  const component = renderer.create(
    <MapResults results={mockedResultsArray}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('DisplayResults Matches Snapshot', () => {
  const component = renderer.create(
    <DisplayResults results={mockedResultsArray}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Location Input Matches Snapshot', () => {
  const component = renderer.create(
    <LocationInput />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Submit Button Matches Snapshot', () => {
  const component = renderer.create(
    <SubmitButton />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Choose Another Location Matches Snapshot', () => {
  const component = renderer.create(
    <ChooseAnotherLocation />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});