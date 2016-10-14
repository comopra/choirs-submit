const BaseOperation = require( "./BaseOperation" );
function LambdaOperation( options, callback ) {
    
    if ( options ) {
        
        this.event = options.event;
        this.context = options.context;
        this.ports = options.ports;
        this.config = options.config;
    
    }
    this.callback = function() {
        
        if ( !arguments[ 0 ] ) {
            
            const payload = arguments[ 1 ];
            if ( !payload ) { throw new Error( "No response object" ); }
            if ( !payload.headers ) { throw new Error( "No headers included in response: " + payload ); }
            if ( !payload.statusCode ) { throw new Error( "No status code included in response" + payload ); }
            if ( payload.body && ( typeof payload.body !== "string" ) ) { throw new Error( "Body is not a string" + payload ); }
        }
        callback.apply( null, arguments );

    };

}
LambdaOperation.prototype = Object.assign( new BaseOperation(), {
    
    constructor: LambdaOperation,
    
    callbackAndReject: function( statusCode, message, reject ) {
        
        this.callback( null, { statusCode, body: message, headers: { "Content-Type": "text/plain" } } );
        if ( !reject ) { return Promise.reject( message ); }
        reject( message );

    },
    
} );

module.exports = LambdaOperation;
