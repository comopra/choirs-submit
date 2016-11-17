import { connect } from "react-redux";
import Editor from "./Editor.jsx";
import actionCreators from "./actions/action-creators";

const mapStateToProps = state => ( {
   
   defaults: state.session
   
} );
const mapDispatchToProps = dispatch => ( {
    
    handleChange: e => dispatch( actionCreators.fieldChange( 
            
        e.target.name,
        e.target.value
    
    ) )
    
} );

const EditorContainer = connect( mapStateToProps, mapDispatchToProps )( Editor );
export default EditorContainer;
