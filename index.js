const execute = require( "./src/script" );
const storageOperation = require( "./src/operations/storage" );

module.exports.handler = ( event, context, callback ) => {
    
    const op = storageOperation.for( event, context, callback );
    execute( op );
    
};
