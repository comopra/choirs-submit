const ports = require( "./ports" );
const eor = require( "./eor" );

const exported = {};

const parse = response => JSON.parse( response.Body );

const validate = config => {
  
  if ( !config.bucket ) { throw new Error( "Missing: bucket" ); }
  if ( config.newrelic ) {
      
      process.env.NEW_RELIC_LICENSE_KEY = config.newrelic.licenseKey;
      require( "newrelic" );
      
  }
  return Promise.resolve( config );
    
};

const exportConfiguration = config => Object.assign( exported, config );

exported.load = function fetchConfiguration() {
    
    return new Promise( ( resolve, reject ) => {

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
    
};

module.exports = exported;
