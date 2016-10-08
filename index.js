    
    // script to execute
    const script = require( "./src/script" );
    
    // a storage operation
    const storageOperation = require( "./src/operations/storage" );
    
    // the handler
    const handler = ( event, context, callback ) => storageOperation
        .init( event, context, callback )
        .execute( script );

    // export it
    module.exports = { handler };
