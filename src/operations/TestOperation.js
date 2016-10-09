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

TestOperation.prototype = Object.assign( new BaseOperation(), {

    constructor: TestOperation,
    
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

        const unsupportedContentTypes = [ "application/ld+json", "application/json", "text/xml", "application/x-www-form-urlencoded" ]
            .except( supportedContentTypes );
            
        const resultAnalyser = ( evt, resolve, reject ) => eor( reject, result => {
            
            should.exist( result.statusCode, 
                
                "Status code should exist"
            
            );
            result.statusCode.should.eql( 415, [
        
                "Should only accept Content Types: " + supportedContentTypes.join( ", " ),
                "The test sent " + evt.headers[ "Content-Type" ],
                "Expected status 415 but got " + result.statusCode
            
            ].paragraph() );
            resolve();
            
        } );
        
        const unsupportedContentTypeAsEventObject = unsupportedContentType => ( { 
            
            httpMethod: "POST", 
            headers: { "Content-Type": unsupportedContentType }
            
        } );

        const invokeHandler = ( evt, analyser ) => this.handler( evt, null, analyser );
        const invokeAsPromiseResolver = evt => ( resolve, reject ) => invokeHandler( evt, resultAnalyser( evt, resolve, reject ) );
        
        return unsupportedContentTypes
            .map( unsupportedContentTypeAsEventObject )
            .map( invokeAsPromiseResolver );
            
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

console.log( badlyStructuredData );

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
