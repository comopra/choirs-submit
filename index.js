    
    // ensure configuration is loaded in
    const config = require( "./src/config" );
    const ensureConfiguration = config.load(); 

    // script to execute
    const script = require( "./src/script" );
    
    // a storage operation
    const StorageOperation = require( "./src/operations/StorageOperation" );
    
    // ports to external resources (e.g. db)
    const ports = require( "./src/ports" );
    
    // the handler
    const handler = ( event, context, callback ) => {
    
        const op = new StorageOperation( { ports, event, context, config } );
        const completion = payload => ports.send( payload, callback );
        ensureConfiguration
            .then( () => op.execute( script )  )
            .then( completion, completion );

    };
    
    // export it
    module.exports = { handler, ports };
