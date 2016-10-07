const sut = require( ".." );
const event = { headers: {} };
const context = {};
 
sut.handler( event, context, ( e, result ) => {

    if ( e ) { throw e; }
    console.log( result );
    
} );
