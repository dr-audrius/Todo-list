import React from "react";
import ReactDOM from 'react-dom';
import Enzyme, { shallow, render, mount, dive } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";
import sinon from "sinon";

// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Define globals to cut down on imports in test files
global.React = React;
global.ReactDOM = ReactDOM;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;