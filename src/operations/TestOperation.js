const BaseOperation = require( "./BaseOperation" );
const eor = require( "../eor" );
const should = require( "should" );
const glob = require( "glob-promise" );

function TestOperation( systemUnderTest ) {
    
    this.handler = systemUnderTest.handler;
    
}

Array.prototype.except = function( xs ) { return this.filter( y => !~xs.indexOf( y ) ); };
Array.prototype.paragraph = function() { return this.join( ". " ) + "."; };
Array.prototype.flatten = function() { return [].concat.apply( [], this ); };

function verifyStatusCode( expectedStatusCode, description, resolve, reject ) {
    
    return eor( reject, result => {
        
        should.exist( result.statusCode, "Status code should exist" );
        const message = [ "Expected status " + expectedStatusCode + " but got " + result.statusCode ]
            .concat( description ).paragraph();
        result.statusCode.should.eql( expectedStatusCode, message );
        resolve();
        
    } );
    
}
TestOperation.prototype = Object.assign( new BaseOperation(), {

    constructor: TestOperation,
    
     runLambdaFunction: function( evt, context, callbackFactory ) {
        
        return new Promise( ( resolve, reject ) => {
        
            const callback = callbackFactory( resolve, reject );
            this.handler( evt, context, callback );
            
        } );
        
    },
    
    shouldOnlyAccept: function( allowedMethods ) {
        
        const disallowedMethods = [ "GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "YOMOMMA" ]
            .except( allowedMethods );
        
        const resultAnalyser = ( evt, resolve, reject ) => eor( reject, result => {
            
            should.exist( result.statusCode,
            
                "Status code should exist"
                
            );
            result.statusCode.should.eql( 405, [
                
                "Should only accept HTTP methods: " + allowedMethods.join( ", " ),
                "The test sent a " + evt.httpMethod,
                "Expected status 405 but got " + result.statusCode
            
            ].paragraph() );
            resolve();
            
        } );
        
        const methodAsEventObject = httpMethod => ( { httpMethod } );
        
        const invokeHandler = ( evt, analyser ) => this.handler( evt, null, analyser );
        const invokeAsPromiseResolver = evt => ( resolve, reject ) => invokeHandler( evt, resultAnalyser( evt, resolve, reject ) );
        
        return disallowedMethods.map( methodAsEventObject ).map( invokeAsPromiseResolver );

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
                    "The test sent " + evt.headers[ "Content-Type" ]
        
                ], resolve, reject )
                
            )
        
        );
            
    },
    
    shouldParseBodyAsJSONLD: function() {
     
        const invalidContent = [ "yomomma", "{ \"@context\": \"yomomma\" }" ];
        
        const resultAnalyser = ( evt, resolve, reject ) => eor( reject, result => {
            
            should.exist( result.statusCode, 
            
                "Status code should exist"
                
            );
            result.statusCode.should.eql( 422, [
        
                "Should parse the body as JSON-LD",
                "The test sent " + evt.body,
                "Expected status 422 but got " + result.statusCode
            
            ].paragraph() );
            resolve();
            
        } );
        
        const invalidContentAsEventObject = invalidContentBody => ( {
            
            httpMethod: "POST",
            headers: { "Content-Type": "application/ld+json" },
            body: invalidContentBody
            
        } );
        
        const invokeHandler = ( evt, analyser ) => this.handler( evt, null, analyser );
        const invokeAsPromiseResolver = evt => ( resolve, reject ) => invokeHandler( evt, resultAnalyser( evt, resolve, reject ) );
        
        return invalidContent
            .map( invalidContentAsEventObject )
            .map( invokeAsPromiseResolver );

    },
    
    shouldHaveSchema: function( schemaName ) {
        
        return glob( __dirname + "/../../schema/examples/invalid/" + schemaName + "-*.json" ).then( filePaths => {
            
            const badlyStructuredData = filePaths.map( filePath => require( filePath ) );

            const asStatusCodeMessage = ( evt, result ) => [
            
                "Should validate against the schema " + schemaName,
                "The test sent " + evt.body,
                "Expected status 400 but got " + result.statusCode
                
            ].paragraph();
            
            const resultAnalyser = ( evt, resolve, reject ) => eor( reject, result => {
                
                should.exist( result.statusCode, "Status code should exist" );
                result.statusCode.should.eql( 422, asStatusCodeMessage( evt, result ) );
                resolve();
                
            } );
            
            const invalidContentAsEventObject = invalidDocument => ( {
                
                httpMethod: "POST",
                headers: { "Content-Type": "application/ld+json" },
                body: JSON.stringify( invalidDocument, null, 3 )
                
            } );
            
            const invokeHandler = ( evt, analyser ) => this.handler( evt, null, analyser );
            const invokeAsPromiseResolver = evt => ( resolve, reject ) => invokeHandler( evt, resultAnalyser( evt, resolve, reject ) );
            
            const promisedTests = badlyStructuredData
                .map( invalidContentAsEventObject )
                .map( invokeAsPromiseResolver );
            
            return Promise.all( promisedTests.map( x => new Promise( x ) ) );
                
        } );
            
    },
    
    shouldBeStoredInS3: () => new Error( "Not implemented" ),
    
    shouldIndicateResult: () => new Error( "Not implemented" )
    
} );
module.exports = TestOperation;
