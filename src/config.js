const ports = require( "./ports" );
const eor = require( "./eor" );

const exported = { load: () => fetchConfiguration };

const parse = response => console.log( response ) || JSON.parse( response.Body );

const validate = config => {
  
  if ( !config.bucket ) { throw new Error( "Missing: bucket" ); }
  return Promise.resolve( config );
    
};

const exportConfiguration = config => Object.assign( exported, config );

const fetchConfiguration = new Promise( ( resolve, reject ) => {

    // AWS S3 implementation of fetch configuration
    ports.db.getObject( {
        
        Bucket: "comopra.com-config",
        Key: "comopra-choirs-submit"
        
    }, eor( reject, result => 
    
        Promise.resolve( parse( result ) )
            .then( config => validate( config ) )
            .then( exportConfiguration )
            .then( resolve, reject )

    ) );
    
} );

module.exports = exported;
