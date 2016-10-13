const LambdaOperation = require( "./LambdaOperation" );
const jsonld = require( "jsonld" );
const ldvalidate = require( "../ld-validate" );
const schemas = require( "../../schema" );

function StorageOperation( evt, context, callback ) {
    
    LambdaOperation.call( this, evt, context, callback );
    
}

StorageOperation.prototype = Object.assign( new LambdaOperation(), {
    
    constructor: StorageOperation,
    
    shouldOnlyAccept: function( allowedMethods ) {
        
        const actualMethod = this.evt.httpMethod;
        if ( !~allowedMethods.indexOf( actualMethod ) ) {
            
            return this.callbackAndReject( 405, "Method not allowed: " + actualMethod );

        }

    },
    
    shouldOnlySupportContentTypes: function( allowedContentTypes ) {
        
        const actualContentType = this.evt.headers[ "Content-Type" ];
        if ( !~allowedContentTypes.indexOf( actualContentType ) ) {
            
            return this.callbackAndReject( 415, "Unsupported content type: " + actualContentType );

        }
        
    },
    
    shouldParseBodyAsJSONLD: function() {
        
        return new Promise( ( resolve, reject ) => {
    
            const diagnose = e => console.log( e.stack ) || console.log( "Body:", this.evt.body );
            var payload;
            try {
            
                payload = JSON.parse( this.evt.body );
                
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

        const diagnose = e => console.log( e.stack ) || console.log( "Body:", this.evt.body );
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
    
    shouldBeStoredInS3: () => Promise.reject( "Not implemented" ),
    
    shouldIndicateResult: () => Promise.reject( "Not implemented" )
    
} );


module.exports = StorageOperation;
