const jsonld = require( "jsonld" );
const sample = require( "./ldvt.json" );
jsonld.expand( sample, ( e, expanded ) => { 
    
    const ldvalidate = require( "." );
    const schemas = require( "../../schema" );
    const context = schemas[ "context" ];
    const validate = ldvalidate( schemas, context );
    validate( "choir", expanded, console.log.bind( console ) );
    
} );
