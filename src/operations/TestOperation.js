const BaseOperation = require( "./BaseOperation" );
const eor = require( "../eor" );

function TestOperation( systemUnderTest ) {
    
    this.handler = systemUnderTest.handler;
    
}
TestOperation.prototype = Object.assign( new BaseOperation(), {

    constructor: TestOperation,
    
    shouldOnlyAccept: function( allowedContentType ) {
        
        console.log( 1234, this )
        return [
            "hello",
            ( resolve, reject ) => 
                this.handler( {}, {}, eor( reject, result => {
                
                    console.log( "Test 1 passed" );
                    resolve();
                
                } ) )
        
        ];
        
    },

    shouldHaveSchema: () => { 
        
        throw new Error( "Not implemented" );
        
    },
    
    shouldBeStoredInS3: () => { 
        
        throw new Error( "Not implemented" );
        
    },
    
    shouldIndicateResult: () => {
        
        throw new Error( "Not implemented" ); 
        
    }
    
} );
module.exports = TestOperation;
