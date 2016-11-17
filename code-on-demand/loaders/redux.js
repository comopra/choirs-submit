const key = "redux";
const version = "3.6.0";

const redux = window.CoP.retrieve( { key, version } ).instance;
export default redux;

const { createStore, applyMiddleware, combineReducers } = redux;
export { createStore, applyMiddleware, combineReducers };
