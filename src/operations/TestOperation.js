const BaseOperation = require( "./BaseOperation" );
const eor = require( "../eor" );
const should = require( "should" );

function TestOperation( systemUnderTest ) {
    
    this.handler = systemUnderTest.handler;
    
}
TestOperation.prototype = Object.assign( new BaseOperation(), {

    constructor: TestOperation,
    
    shouldOnlyAccept: function() {
        
        const allowedMethods = [].slice.call( arguments, 0, 999 );
        const manyMethods = [ "GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "YOMOMMA" ];
        const resultAnalyser = ( evt, resolve, reject ) => eor( reject, result => {
            
            const message = [
                
                "Should only accept HTTP methods: " + allowedMethods.join( ", " ),
                "The test sent a " + evt.httpMethod,
                "Expected status 405 but got " + result.status
            
            ].join( ". " );
            result.status.should.eql( 405, message );
            resolve();
            
        } );
        const methodAsEvent = httpMethod => ( { httpMethod } );
        const disallowed = x => !~allowedMethods.indexOf( x )
        // given an vent object, return a promise resovler which invokes the handler
        const runTest = evt => ( resolve, reject ) => this.handler( evt, null, resultAnalyser( evt, resolve, reject ) );
        return manyMethods.filter( disallowed ).map( methodAsEvent ).map( runTest );

    },

    shouldOnlyAcceptContentTypes: () => new Error( "Not implemented" ),
    
    shouldHaveSchema: () => new Error( "Not implemented" ),
    
    shouldBeStoredInS3: () => new Error( "Not implemented" ),
    
    shouldIndicateResult: () => new Error( "Not implemented" )
    
} );
module.exports = TestOperation;
