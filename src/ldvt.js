const jsonld = require( "jsonld" );
const sample = require( "./ldvt.json" );
jsonld.expand( sample, ( e, expanded ) => { 
    
    const ldvalidate = require( "./ld-validate" );
    const ldQuery = require( "ld-query" );
    const schemas = require( "../schema" );
    const context = schemas[ "context" ];
    const query = ldQuery( context );
    const validate = ldvalidate( query, schemas, context );
    validate( "choir", expanded, console.log.bind( console ) );
    
} );
