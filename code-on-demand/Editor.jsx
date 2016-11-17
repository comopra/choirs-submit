import React, { Component, PropTypes } from "react";
import serialize from "form-serialize";

import "./editor.less";

class Editor extends Component {
    
    handleSubmit( e ) {
        
        e.preventDefault();
        console.log( serialize( this.refs.form, { hash: true } ) );
        
    }
    
    render() {
    
        const { handleChange, defaults } = this.props;
        return <article className="comopra-choirs-submit">
            <h1>Editor</h1>
            <form ref="form" method="POST" action="/error" onSubmit={ e => this.handleSubmit( e ) }>
                <p>
                    <label>Name</label>
                    <input type="text" name="name" defaultValue={ defaults.name } onChange={ e => handleChange( e ) } />
                </p>
                <input type="submit" value="Submit" />
            </form>
        </article>;
        
    }
    
}

export default Editor;
