const LambdaTestOperation = require( "./LambdaTestOperation" );
const eor = require( "../eor" );
const should = require( "should" );
const glob = require( "glob-promise" );

function StorageTestOperation( systemUnderTest ) {
    
    LambdaTestOperation.call( this, systemUnderTest );

}

Array.prototype.except = function( xs ) { return this.filter( y => !~xs.indexOf( y ) ); };

function paragraph() { return [].reduce.call( arguments, ( ret, a ) => ret.concat( a || [] ), [] ).join( ". " ) + "."; }

function assertStatusCode( expectedStatusCode, result ) {
    
    should.exist( result.statusCode, "Status code should exist" );
    result.statusCode.should.eql( expectedStatusCode, "Expected status " + expectedStatusCode + " but got " + result.statusCode );
        
}
function verifyStatusCode( expectedStatusCode, description, resolve, reject ) {
    
    return eor( reject, result => {
        
        try {
    
            assertStatusCode( expectedStatusCode, result );
        
        } catch( e ) {
            
            throw new Error( paragraph( e.message, description ) );
            
        }
        resolve();
            
    } );
    
}
StorageTestOperation.prototype = Object.assign( new LambdaTestOperation(), {

    constructor: StorageTestOperation,
    
    shouldOnlyAccept: function( allowedMethods ) {
        
        const testEvents = [ "GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "YOMOMMA" ]
            .except( allowedMethods )
            .map( httpMethod => ( {
                
                httpMethod
                
            } ) );
            
        return testEvents.map( evt =>
        
            this.runLambdaFunction( evt, null, ( resolve, reject ) => 
            
                verifyStatusCode( 405, [
            
                    "Should only accept HTTP methods: " + allowedMethods.join( ", " ),
                    "The test sent a " + evt.httpMethod
        
                ], resolve, reject )
                
            )
        
        );

    },
    
    shouldOnlySupportContentTypes: function( supportedContentTypes ) {
        
        const testEvents = [ "application/ld+json", "application/json", "text/xml", "application/x-www-form-urlencoded" ]
            .except( supportedContentTypes )
            .map( unsupportedContentType => ( { 
            
                httpMethod: "POST", 
                headers: { "Content-Type": unsupportedContentType }
                
            } ) );
            
        return testEvents.map( evt =>
        
            this.runLambdaFunction( evt, null, ( resolve, reject ) => 
            
                verifyStatusCode( 415, [
            
                    "Should only accept Content Types: " + supportedContentTypes.join( ", " ),
                    "The test sent: " + evt.headers[ "Content-Type" ]
        
                ], resolve, reject )
                
            )
        
        );
            
    },
    
    shouldParseBodyAsJSONLD: function() {
     
        const testEvents = [ "yomomma", "{ \"@context\": \"yomomma\" }" ]
            .map( invalidContent => ( {
                
                httpMethod: "POST",
                headers: { "Content-Type": "application/ld+json" },
                body: invalidContent
                
            } ) );
        return testEvents.map( evt => 
        
            this.runLambdaFunction( evt, null, ( resolve, reject ) => 
            
                verifyStatusCode( 422, [
                    
                    "Should parse the body as JSON-LD",
                    "The test sent " + evt.body,

                ], resolve, reject )
            
            )
        
        );

    },
    
    shouldHaveSchema: function( schemaName ) {
        
        return glob( __dirname + "/../../schema/examples/invalid/" + schemaName + "-*.json" ).then( filePaths => {
            
            const testEvents = filePaths.map( filePath => require( filePath ) )
                .map( invalidDocument => ( {
                    
                    httpMethod: "POST",
                    headers: { "Content-Type": "application/ld+json" },
                    body: JSON.stringify( invalidDocument, null, 3 )
                
                } ) );

            return Promise.all( testEvents.map( evt => 
            
                this.runLambdaFunction( evt, null, ( resolve, reject ) => 
                
                    verifyStatusCode( 422, [
                        
                        "Should validate against the schema " + schemaName,
                        "The test sent " + evt.body,
    
                    ], resolve, reject )
                
                )
            
            ) );
                
        } );
            
    },
    
    shouldBeStoredInS3: () => Promise.reject( "Not implemented" ),
    
    shouldIndicateResult: () => Promise.reject( "Not implemented" )
    
} );
module.exports = StorageTestOperation;
