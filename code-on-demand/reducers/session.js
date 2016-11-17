import _ from "../actions/action-types";

const store = window.sessionStorage;

const initialState = ( function fetchState() {
    
    if ( !store ) { return {}; }
    try {

console.log( store.getItem( "editor-state" ) );
        return JSON.parse( store.getItem( "editor-state" ) ) || {};
        
    } catch( e ) {

        return {};
        
    }
    
}() );

export default ( state = initialState, action ) => {

    if ( !store ) { return state;}
    
    switch( action.type ) {
        
        case _.FIELD_CHANGE:
            const newState = {
                
                ...state,
                [ action.prop ]: action.value,
                
            };
            store.setItem( "editor-state", JSON.stringify( newState ) );
            return newState;
            
        default:
            return state;
            
    }
    
};
