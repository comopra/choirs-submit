import { createStore } from "redux"
import editorReducer from "./reducers/editor"

const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore( editorReducer, devtools );
