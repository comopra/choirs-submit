const base = require( "./base" );

const init = ( sut, handleTestResults ) => Object.assign( base.init(), {

    shouldOnlyAccept: function( allowedContentType ) {

        this.chain( ( resolve, reject ) => reject( new Error( "Not implemented" ) ) );
        return this;
        
    },
    
    shouldHaveSchema: function( schemaName ) {
        
        this.chain( () => { throw new Error( "Not implemented" ); } );
        return this;
        
    },
    
    shouldBeStoredInS3: function() {
        
        this.chain( () => { throw new Error( "Not implemented" ); } );
        
    }
    
} );

module.exports = { init };