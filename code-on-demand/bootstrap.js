import EditorContainer from "./EditorContainer.jsx";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import editorStore from "./editor-store";

function appendContainer() {
    
    const div = document.createElement( "div" );
    document.body.appendChild( div );
    return div;
    
}

function loadWidget( e ) {
    
    const site = ( e.detail && e.detail.site ) || appendContainer();
    const widget = <Provider store={editorStore}><EditorContainer /></Provider>;
    render( widget, site );
    
}

document.addEventListener( "load-comopra-choirs-submit", loadWidget );
document.dispatchEvent( new CustomEvent( "widget-loaded", { detail: "comopra-choirs-submit" } ) );
