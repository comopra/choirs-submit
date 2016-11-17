const key = "react";
const version = "15.3.2";

const React = window.CoP.retrieve( { key, version } ).instance;
export default React;

const { Component, PropTypes } = React;
export { Component, PropTypes };
