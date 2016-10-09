const base = require( "./base" );

const init = ( event, context, callback ) => Object.assign( base.init(), {
    
    shouldOnlyAccept: function( contentType ) {
        
        return this.chain( () => Promise.reject( "Not implemented" ) );

    },
    
    shouldHaveSchema: function( schemaName ) {
        
        return this.chain( () => Promise.reject( "Not implemented" ) );
        
    },
    
    shouldBeStoredInS3: function() {
        
        return this.chain( () => Promise.reject( "Not implemented" ) );

    },
    
    shouldIndicateResult: function() {

        return this.chain( () => Promise.reject( "Not implemented" ) );        

    }
    
} );

module.exports = { init };
