// promise configuration
const config = require( "./src/config" ).load();

// the ports
const ports = require( "./src/ports" );

// the handler
const handler = require( "operation-lambda/src/handler" )( { 
    
    config: config,
    script: require( "./src/script" ),
    Operation: require( "./src/operations/StorageOperation" ),
    ports: ports

} );

// export it
module.exports = { handler, ports };
