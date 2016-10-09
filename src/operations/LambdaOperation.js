const BaseOperation = require( "./BaseOperation" );
function LambdaOperation( evt, context, callback ) {
    
    this.evt = evt;
    this.context = context;
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
