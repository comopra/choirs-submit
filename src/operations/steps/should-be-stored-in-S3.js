const ldquery = require( "ld-query" );
const shortid = require( "shortid" );
const eor = require( "../../eor" );

module.exports = function shouldBeStoredInS3() {
        
    const data = this.body[ 0 ];
    const doc = ldquery( data, { "so": "http://schema.org/" } );
    const docid = doc.query( "> @id" );   
    if ( !docid ) {
        
        const name = doc.query( "so:name @value" );
        data[ "@id" ] = [
            
            "http://worldchoirs.comopra.com/choirs/",
            name.toLowerCase().replace( /[^a-z0-9]/g, "-" ),
            "-",
            shortid.generate()
            
        ].join( "" );
        
    }
    const id = /\/([^\/]*\/[^\/]*)$/.exec( data[ "@id" ] )[ 1 ];
    const isPUT = this.event.httpMethod === "PUT";
    if ( isPUT && !new RegExp( id + "$" ).test( this.event.path ) ) {
        
        const payload = this.payload( 422, "Entity @id does not match this location" );
        return Promise.reject( payload );
        
    } else {

        const S3payload = {
            
            Bucket: this.config.bucket,
            Key: id,
            Body: JSON.stringify( this.body, null, 1 )
        
        };
        return new Promise( ( resolve, reject ) => {

            return this.ports.db.putObject( S3payload, eor( reject, data => {

                this.s3response = data;
                resolve();
                
            } ) ); 
    
        } );
        
    }
    
};
