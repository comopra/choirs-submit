    
    // ensure configuration is loaded in
    const config = require( "./src/config" );
    const ensureConfiguration = config.load(); 

    // script to execute
    const script = require( "./src/script" );
    
    // a storage operation
    const StorageOperation = require( "./src/operations/StorageOperation" );

    // to generate error numbers
    const shortid = require( "shortid" );
    
    // diagnose what went wrong and sanitize the output
    const sanitizeError = callback => maybeError => {
        
        const errNum = shortid.generate();
        console.log( "[ ERROR", errNum, "]", maybeError.stack || maybeError );
        callback( null, { 
            
            "headers": { "Content-Type": "text/plain" },
            "statusCode": 500, 
            "body": "An error occurred processing the request. [ Error code: " + errNum + " ]"
            
        } );
            
    };

    // ports to external resources (e.g. db)
    const ports = require( "./src/ports" );
    
    // the handler
    const handler = ( event, context, callback ) => ensureConfiguration
        .then( () => 
            new StorageOperation( { ports, event, context, config }, callback )
                .execute( script ) )
        .catch( sanitizeError( callback ) );

    // export it
    module.exports = { handler, ports };
