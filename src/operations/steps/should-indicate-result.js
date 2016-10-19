const ldquery = require( "ld-query" );

module.exports = function shouldIndicateResult() {
    
    const data = this.body[ 0 ];
    const doc = ldquery( data, { "so": "http://schema.org/" } );
    const docid = doc.query( "> @id" );
    const headers = { Location: docid };
    const payload = this.payload( 204, undefined, headers );
    return Promise.resolve( payload );
    
};
