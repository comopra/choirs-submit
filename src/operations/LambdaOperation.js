const BaseOperation = require( "./BaseOperation" );
function LambdaOperation( options, callback ) {
    
    if ( options ) {
        
        this.event = options.event;
        this.context = options.context;
        this.ports = options.ports;
        this.config = options.config;
    
    }
    this.callback = callback;

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
