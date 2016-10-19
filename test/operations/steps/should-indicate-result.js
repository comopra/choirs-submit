const should = require( "should" );
const eor = require( "../../../src/eor" );
const ldquery = require( "ld-query" );

module.exports = examples => function() {
        
    const validDocument = require( examples + "/valid-choir.json" );
    const evtForCreate = {
                    
        httpMethod: "POST",
        headers: { "Content-Type": "application/ld+json" },
        body: JSON.stringify( validDocument ),
        path: "choirs/someid"

    };
    return this.run( evtForCreate, null, 
    
        this.verifyStatusCode( 204, [ "Should indicate created" ] )

    ).then( () => this.run( evtForCreate, null, ( e, result, callback ) => {
    
        if ( e ) { callback( e ); } else {

            try {
                
                const lastCall = this.ports.db.calls.pop();
                should.exist( lastCall, "db was not called" );
                const params = lastCall.args[ 0 ];
                const actual = JSON.parse( params.Body );
                const docid = ldquery( actual, { "dummy": "" } ).query( "> @id" );
                result.headers.Location.should.eql( docid );
                callback();
                
            } catch( e ) {
                
                callback( e );
                
            }

        }    

    } ) );

};
