const BaseOperation = require( "./BaseOperation" );
const notImplemented = BaseOperation.notImplemented;

function StorageOperation( evt, context, callback ) {
    
    this.evt = evt;
    this.context = context;
    this.callback = callback;
    
}
StorageOperation.prototype = Object.assign( new BaseOperation(), {
    
    constructor: StorageOperation,
    shouldOnlyAccept: function() {
        
        const allowedMethods = [].slice.call( arguments, 0 );
        const actualMethod = this.evt.httpMethod;
        if ( !~allowedMethods.indexOf( actualMethod ) ) {
            
            const status = 405;
            const body = "Method not allowed: " + actualMethod;
            this.callback( null, { status, body } );
            return Promise.reject( body );
            
        }

    },
    shouldOnlyAcceptContentTypes: () => notImplemented(),
    shouldHaveSchema: () => notImplemented(),
    shouldBeStoredInS3: () => notImplemented(),
    shouldIndicateResult: () => notImplemented()
    
} );


module.exports = StorageOperation;
