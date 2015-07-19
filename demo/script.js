require('node_modules/bootstrap/dist/css/bootstrap.css');

var React = require('react');
var DemoPaginatorApp = require('./DemoPaginatorApp.jsx');

var demoDiv = document.getElementById('paginatorDemo');
DemoPaginatorApp.renderApp(demoDiv);
