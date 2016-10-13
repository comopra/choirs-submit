const LambdaTestOperation = require( "./LambdaTestOperation" );
const glob = require( "glob-promise" );

function StorageTestOperation( systemUnderTest ) {
    
    LambdaTestOperation.call( this, systemUnderTest );

}

Array.prototype.except = function( xs ) { return this.filter( y => !~xs.indexOf( y ) ); };

StorageTestOperation.prototype = Object.assign( new LambdaTestOperation(), {

    constructor: StorageTestOperation,
    
    shouldOnlyAccept: function( allowedMethods ) {
        
        return [ "GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "YOMOMMA" ]
            .except( allowedMethods )
            .map( httpMethod => ( { httpMethod } ) )
            .map( evt =>
        
                this.run( evt, null, ( resolve, reject ) => 
                
                    this.verifyStatusCode( 405, [
                
                        "Should only accept HTTP methods: " + allowedMethods.join( ", " ),
                        "The test sent a " + evt.httpMethod
            
                    ], resolve, reject )
                    
                )
                
            );
        
    },
    
    shouldOnlySupportContentTypes: function( supportedContentTypes ) {
        
        return [ "application/ld+json", "application/json", "text/xml", "application/x-www-form-urlencoded" ]
            .except( supportedContentTypes )
            .map( unsupportedContentType =>
            
                ( { 
            
                    httpMethod: "POST", 
                    headers: { "Content-Type": unsupportedContentType }
                
                } )
                
            )
            .map( evt =>
        
                this.run( evt, null, ( resolve, reject ) => 
                
                    this.verifyStatusCode( 415, [
                
                        "Should only accept Content Types: " + supportedContentTypes.join( ", " ),
                        "The test sent: " + evt.headers[ "Content-Type" ]
            
                    ], resolve, reject )
                    
                )
        
            );
            
    },
    
    shouldParseBodyAsJSONLD: function() {
     
        return [ "yomomma", "{ \"@context\": \"yomomma\" }" ]
            .map( invalidContent => 
            
                ( {
                
                    httpMethod: "POST",
                    headers: { "Content-Type": "application/ld+json" },
                    body: invalidContent
                
                } )
                
            )
            .map( evt => 
                
                this.run( evt, null, ( resolve, reject ) => 
                
                    this.verifyStatusCode( 422, [
                        
                        "Should parse the body as JSON-LD",
                        "The test sent " + evt.body,
    
                    ], resolve, reject )
                
                )
        
            );

    },
    
    shouldHaveSchema: function( schemaName ) {
        
        return glob( __dirname + "/../../schema/examples/invalid/" + schemaName + "-*.json" )
            .then( filePaths =>
            
                Promise.all( filePaths
                    .map( filePath => require( filePath ) )
                    .map( invalidDocument => 
                    
                        ( {
                        
                            httpMethod: "POST",
                            headers: { "Content-Type": "application/ld+json" },
                            body: JSON.stringify( invalidDocument, null, 3 )
                    
                        } ) 
                    
                    )
                    .map( evt => 
            
                        this.run( evt, null, ( resolve, reject ) => 
                
                            this.verifyStatusCode( 422, [
                        
                                "Should validate against the schema " + schemaName,
                                "The test sent " + evt.body,
            
                            ], resolve, reject )
                
                        )
            
                    )
                    
                )
            
            );
            
    },
    
    shouldBeStoredInS3: () => Promise.reject( "Not implemented" ),
    
    shouldIndicateResult: () => Promise.reject( "Not implemented" )
    
} );
module.exports = StorageTestOperation;
