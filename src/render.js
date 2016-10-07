const handlebars = require( "handlebars" );
const fs = require( "fs" );

module.exports = ( options, callback ) => {
    
    const view = options.view;
    const data = options.data;
    fs.readFile( __dirname + "/../views/" + view + ".hbs", "utf8", ( e, template ) => {
    
        if ( e ) { callback( e ); } else {
        
            var result;
            try {
                
                result = handlebars.compile( template )( data );
                
            } catch( e ) {
                
                callback( e );
                return;
                
            }
            callback( null, result );
                
        }
        
    } );
};
