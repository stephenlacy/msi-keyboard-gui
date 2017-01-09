'use strict';

var React = require('react');
var render = require('react-dom').render;
var App = require('./views/App');

render(
  React.createElement(App),
  document.getElementById('root')
);
