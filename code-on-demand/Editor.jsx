import React from "react";
import serialize from "form-serialize";

import "./editor.less";

class Editor extends React.Component {
    
    handleSubmit( e ) {
        
        e.preventDefault();
        console.log( serialize( this.refs.form, { hash: true } ) );
        
    }
    
    render() {
    
        return <article className="comopra-choirs-submit">
            <h1>Editor</h1>
            <form ref="form" method="POST" action="/error" onSubmit={ e => this.handleSubmit( e ) }>
                <p>
                    <label>Name</label>
                    <input type="text" name="name" />
                </p>
                <input type="submit" value="Submit" />
            </form>
        </article>;
        
    }
    
}

export default Editor;
