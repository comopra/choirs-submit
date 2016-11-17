const key = "react-redux";
const version = "4.4.6";

const x = window.CoP.retrieve( { key, version } ).instance;
const { Provider, connect } = x;
export { Provider, connect };
