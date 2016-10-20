// promise configuration
const config = require( "./src/config" );
const configPromise = config.load();

// the ports
const ports = require( "./src/ports" );

// the handler
const handler = require( "operation-lambda/src/handler" )( { 
    
    config: config,
    configPromise: configPromise,
    script: require( "./src/script" ),
    Operation: require( "./src/operations/StorageOperation" ),
    ports: ports

} );

// export it
module.exports = { handler, ports };
