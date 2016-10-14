const TestOperation = require( "./TestOperation" );
const should = require( "should" );
const eor = require( "../../src/eor" );

function paragraph() { return [].reduce.call( arguments, ( ret, a ) => ret.concat( a || [] ), [] ).join( ". " ) + "."; }

function assertStatusCode( expectedStatusCode, result ) {
    
    should.exist( result.statusCode, "Status code should exist" );
    result.statusCode.should.eql( expectedStatusCode, "Expected status " + expectedStatusCode + " but got " + result.statusCode );
        
}

function LambdaTestOperation( systemUnderTest ) {
    
    if ( systemUnderTest ) {

        this.handler = systemUnderTest.handler;
        this.ports = systemUnderTest.ports;
        
    }
    
}

LambdaTestOperation.prototype = Object.assign( new TestOperation(), {
    
    constructor: LambdaTestOperation,
    
    run: function run( evt, context, callbackFactory ) {
        
        return new Promise( ( resolve, reject ) => {
        
            const callback = callbackFactory( resolve, reject );
            try {
                
                this.handler( evt, context, ( e, result ) => {

                    try {
                        
                        callback( e, result );
                        
                    } catch( e ) {
                        
                        reject( e );
                        
                    }
                    
                } );
            
            } catch ( synchronousError ) {
                
                callback( synchronousError );
                
            }

        } );
        
    },
    
    verifyStatusCode: function verifyStatusCode( expectedStatusCode, description, resolve, reject ) {
    
        return eor( reject, result => {
            
            try {
        
                assertStatusCode( expectedStatusCode, result );
            
            } catch( e ) {
                
                throw new Error( paragraph( e.message, description ) );
                
            }
            resolve();
                
        } );
        
    }
    
} );

module.exports = LambdaTestOperation;
