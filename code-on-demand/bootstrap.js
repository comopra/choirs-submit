import Editor from "./Editor.jsx";
import React from "react";
import ReactDOM from "react-dom";

function appendContainer() {
    
    const div = document.createElement( "div" );
    document.body.appendChild( div );
    return div;
    
}

function loadComponent( e ) {
    
    const site = ( e.detail && e.detail.site ) || appendContainer();
    ReactDOM.render( <Editor />, site );
    
}

document.addEventListener( "load-comopra-choirs-submit", loadComponent );
document.dispatchEvent( new CustomEvent( "widget-loaded", { detail: "comopra-choirs-submit" } ) );
