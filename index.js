    
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
    const sanitizeError = maybeError => {
        
        const errNum = shortid.generate();
        console.error( "[ ERROR", errNum, "]", maybeError.stack || maybeError );
        throw new Error( "An error occurred processing the request. [ Error code: " + errNum + " ]" );
        
    };

    // ports to external resources (e.g. db)
    const ports = require( "./src/ports" );
    
    // the handler
    const handler = ( event, context, callback ) => ensureConfiguration
        .then( () => new StorageOperation( 
            
            { ports, event, context, config }, 
            callback 
        
        ).execute( script ) )
        .catch( sanitizeError )
        .catch( callback );

    // export it
    module.exports = { handler, ports };
