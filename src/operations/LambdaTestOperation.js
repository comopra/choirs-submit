const TestOperation = require( "./TestOperation" );

function LambdaTestOperation( systemUnderTest ) {
    
    if ( systemUnderTest ) {

        this.handler = systemUnderTest.handler;
        
    }
    
}

LambdaTestOperation.prototype = Object.assign( new TestOperation(), {
    
    constructor: LambdaTestOperation,
    
    runLambdaFunction: function( evt, context, callbackFactory ) {
        
        return new Promise( ( resolve, reject ) => {
        
            const callback = callbackFactory( resolve, reject );
            this.handler( evt, context, ( e, result ) => {
               
                try {
                    
                    callback( e, result );
                    
                } catch( e ) {
                    
                    reject( e );
                    
                }
                
            } );

        } );
        
    }
    
} );

module.exports = LambdaTestOperation;
