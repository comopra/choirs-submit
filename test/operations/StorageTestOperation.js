const glob = require( "glob-promise" );
const jsonld = require( "jsonld" );
const should = require( "should" );

const LambdaTestOperation = require( "./LambdaTestOperation" );

const eor = require( "../../src/eor" );
const examples = __dirname + "/../examples";

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
        
        return glob( examples + "/invalid/" + schemaName + "-*.json" )
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
    
    shouldBeStoredInS3: function() {
        
        const validDocument = require( examples + "/valid-choir.json" );
        const evtForCreate = {
                        
            httpMethod: "POST",
            headers: { "Content-Type": "application/ld+json" },
            body: JSON.stringify( validDocument ),
            path: "choirs/someid"
    
        };
        const evtForUpdate = Object.assign( {}, evtForCreate, { 
            
            httpMethod: "PUT",
            body: JSON.stringify( Object.assign( { "@id": "http://worldchoirs.comopra.com/choirs/someid" }, validDocument ) )
            
        } );
        const evtForUpdateWithMismatchedId = Object.assign( {}, evtForUpdate, {
            
            path: "/choirs/someotherid"
            
        } );
        return this.run( evtForCreate, null, ( resolve, reject ) => 
        
            eor( reject, () => {
    
                const lastCall = this.ports.db.calls.pop();
                should.exist( lastCall, "db was not called" );
                
                // should call putObject
                const target = lastCall.target;
                target.name.should.eql( "putObject" );
                
                const params = lastCall.args[ 0 ];
                
                // bucket from configuration
                params.Bucket.should.eql( "the-bucket" );

                // assigned key
                params.Key.should.match( /^choirs\/the-big-bang-choir-[A-Za-z0-9_-]*$/ );
                
                // check body
                
                const actual = JSON.parse( params.Body );
                const expected = Object.assign( { "@id": "http://worldchoirs.comopra.com/" + params.Key }, validDocument );
                jsonld.expand( expected, eor( reject, expanded => {
                    
                    actual.should.eql( expanded ); 
                    resolve();
                    
                } ) );
                
            } )
        
        ).then( () => this.run( evtForUpdate, null, ( resolve, reject ) => 
        
            eor( reject, result => {

                const lastCall = this.ports.db.calls.pop();
                should.exist( lastCall, "db was not called" );
                
                // should call putObject
                const target = lastCall.target;
                target.name.should.eql( "putObject" );
                
                const params = lastCall.args[ 0 ];
                
                // bucket from configuration
                params.Bucket.should.eql( "the-bucket" );
                
                // assigned key
                params.Key.should.eql( "choirs/someid" );
                
                // check body
                const actual = JSON.parse( params.Body );
                const expected = Object.assign( { "@id": "http://worldchoirs.comopra.com/choirs/someid" }, validDocument );
                jsonld.expand( expected, eor( reject, expanded => {
                    
                    actual.should.eql( expanded ); 
                    resolve();
                    
                } ) );
                
            } )
            
        ) ).then( () => this.run( evtForUpdateWithMismatchedId, null, ( resolve, reject ) => 
        
            this.verifyStatusCode( 422, [
                        
                "Should reject a PUT where the id does not match the URL",
                "The test sent " + evtForUpdateWithMismatchedId.body,
            
            ], resolve, reject )
            
        ) );

    },
    
    shouldIndicateResult: () => Promise.reject( "Not implemented" )
    
} );
module.exports = StorageTestOperation;
