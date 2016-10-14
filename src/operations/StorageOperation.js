const jsonld = require( "jsonld" );
const shortid = require( "shortid" );
const ldquery = require( "ld-query" );

const LambdaOperation = require( "./LambdaOperation" );

const ldvalidate = require( "../ld-validate" );
const schemas = require( "../../schema" );
const eor = require( "../eor" );

function StorageOperation( options, callback ) {
    
    LambdaOperation.call( this, options, callback );
    
}

StorageOperation.prototype = Object.assign( new LambdaOperation(), {
    
    constructor: StorageOperation,
    
    shouldOnlyAccept: function( allowedMethods ) {
        
        const actualMethod = this.event.httpMethod;
        if ( !~allowedMethods.indexOf( actualMethod ) ) {
            
            return this.callbackAndReject( 405, "Method not allowed: " + actualMethod );

        }

    },
    
    shouldOnlySupportContentTypes: function( allowedContentTypes ) {
        
        const actualContentType = this.event.headers[ "Content-Type" ];
        if ( !~allowedContentTypes.indexOf( actualContentType ) ) {
            
            return this.callbackAndReject( 415, "Unsupported content type: " + actualContentType );

        }
        
    },
    
    shouldParseBodyAsJSONLD: function() {
        
        return new Promise( ( resolve, reject ) => {
    
            const diagnose = e => console.log( e.stack ) || console.log( "Body:", this.event.body );
            var payload;
            try {
            
                payload = JSON.parse( this.event.body );
                
            } catch ( e ) {

                diagnose( e );
                return this.callbackAndReject( 422, "Unprocessable entity", reject );
                
            }
            jsonld.expand( payload, ( e, expanded ) => {
            
                if ( e ) { 
                    
                    diagnose( e );
                    return this.callbackAndReject( 422, "Unprocessable entity", reject );
                
                } else {
                    
                    this.body = expanded;
                    resolve();
                    
                }
                
            } );
            
        } );
        
    },
    
    shouldHaveSchema: function( schemaName ) {

        const diagnose = e => console.log( e.stack ) || console.log( "Body:", this.event.body );
        return new Promise( ( resolve, reject ) => {
            
            const validate = ldvalidate( schemas, schemas[ "context" ] );
            validate( schemaName, this.body, e => {
            
                if ( e ) { 
                    
                    diagnose( e );
                    const message = [ "Unprocessable entity", e.message ].join( "\n\n" );
                    return this.callbackAndReject( 422, message, reject );
                    
                } else {
                    
                    resolve();
                    
                }
                
            } );

        } );
        
    },
    
    shouldBeStoredInS3: function() {
        
        const data = this.body[ 0 ];
        const doc = ldquery( data, { "so": "http://schema.org/" } );
        const docid = doc.query( "> @id" );   
        if ( !docid ) {
            
            const name = doc.query( "so:name @value" );
            data[ "@id" ] = [
                
                "http://worldchoirs.comopra.com/choirs/",
                name.toLowerCase().replace( /[^a-z0-9]/g, "-" ),
                "-",
                shortid.generate()
                
            ].join( "" );
            
        }
        const id = /\/([^\/]*\/[^\/]*)$/.exec( data[ "@id" ] )[ 1 ];
        const isPUT = this.event.httpMethod === "PUT";
        if ( isPUT && !new RegExp( id + "$" ).test( this.event.path ) ) {
            
            return this.callbackAndReject( 422, "Entity @id does not match this location" );
            
        } else {
    
            const payload = {
                
                Bucket: this.config.bucket,
                Key: id,
                Body: JSON.stringify( this.body, null, 1 )
            
            };
            return new Promise( ( resolve, reject ) => 
        
                this.ports.db.putObject( payload, eor( reject, resolve ) ) 
        
            );
            
        }
        
    },
    
    shouldIndicateResult: function() {
    
        this.callback();
        return Promise.resolve( "Not implemented" );
        
    }
    
} );


module.exports = StorageOperation;
