    
    // script to execute
    const script = require( "./src/script" );
    
    // a storage operation
    const StorageOperation = require( "./src/operations/StorageOperation" );
    
    const throwNext = e => process.nextTick( () => { throw e; } );
    const diagnoseRejects = maybeError => 
        ( maybeError instanceof Error ) ? 
            throwNext( maybeError ) : console.log( maybeError );
            
    // the handler
    const handler = ( event, context, callback ) => 
        new StorageOperation( event, context, callback )
            .execute( script )
            .catch( diagnoseRejects );
        
    // export it
    module.exports = { handler };
