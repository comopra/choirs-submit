const render = require( "./src/render" );
const gateway = require( "./src/gateway" );
const mediaTypes = [ "application/json", "text/html" ];
const negotiate = require( "./src/negotiate" )( mediaTypes );

module.exports.handler = ( event, context, callback ) => {

    const body = "Hello from comopra. The time here is " + ( new Date().toLocaleTimeString() );
    const data = { body };
    const mediaType = negotiate( event );
    switch( mediaType ) {
        
        case "text/html":
            const view = "hello-world";
            const sendHTML = gateway( "text/html", callback );
            render( { view, data }, sendHTML );
            break;
            
        case "application/json":
            const sendJSON = gateway( "application/json", callback );
            sendJSON( null, body );
            break;
            
        default:
            callback( new Error( 
                
                "No acceptable media-type available for: " + event.headers.Accept + 
                ". Available types: " + mediaTypes
                
            ) );

    }

};
