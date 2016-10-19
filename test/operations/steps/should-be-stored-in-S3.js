const jsonld = require( "jsonld" );
const should = require( "should" );
const eor = require( "../../../src/eor" );

module.exports = examples => function() {
        
    const validDocument = require( examples + "/valid-choir.json" );
    const evtForCreate = {
                    
        httpMethod: "POST",
        headers: { "Content-Type": "application/ld+json" },
        body: JSON.stringify( validDocument ),
        path: "choirs/someid"

    };
    const evtForUpdate = Object.assign( {}, evtForCreate, { 
        
        httpMethod: "PUT",
        body: JSON.stringify( Object.assign( { "@id": "http://worldchoirs.comopra.com/choirs/someid" }, validDocument ) )
        
    } );
    const evtForUpdateWithMismatchedId = Object.assign( {}, evtForUpdate, {
        
        path: "/choirs/someotherid"
        
    } );
    return this.run( evtForCreate, null, ( e, result, callback ) => {

        if ( e ) {  callback( e ); } else {
            
            try {
                
            
                // should call putObject
                const lastCall = this.ports.db.calls.pop();
                should.exist( lastCall, "db was not called" );
                const target = lastCall.target;
                target.name.should.eql( "putObject" );
                const params = lastCall.args[ 0 ];
                
                // bucket should be retrieved from the configuration
                params.Bucket.should.eql( "the-bucket" );
    
                // a key should be assigned which contains the munged name
                params.Key.should.match( /^choirs\/the-big-bang-choir-[A-Za-z0-9_-]*$/ );
                
                // the body should have had the @id added to it
                const actual = JSON.parse( params.Body );
                const expected = Object.assign( { "@id": "http://worldchoirs.comopra.com/" + params.Key }, validDocument );
                jsonld.expand( expected, eor( callback, expanded => {
                
                    try {
                        
                        actual.should.eql( expanded );
                        callback();
                        
                    } catch( e ) {
                        
                        callback( e );
                        
                    }
                    
                } ) );
            
            } catch( e ) {
                
                callback( e );
                
            }

        }
    
    } ).then( () => this.run( evtForUpdate, null, ( e, result, callback ) => {

        if ( e ) { callback( e ); } else {
            
            try {
       
                // should call putObject
                const lastCall = this.ports.db.calls.pop();
                should.exist( lastCall, "db was not called" );
                const target = lastCall.target;
                target.name.should.eql( "putObject" );
                const params = lastCall.args[ 0 ];
                
                // bucket from configuration
                params.Bucket.should.eql( "the-bucket" );
                
                // key should be determined by the document's @id
                params.Key.should.eql( "choirs/someid" );
                
                // check body still has the @id
                const actual = JSON.parse( params.Body );
                const expected = Object.assign( { "@id": "http://worldchoirs.comopra.com/choirs/someid" }, validDocument );
                jsonld.expand( expected, eor( callback, expanded => {
                    
                    try {
                        
                        actual.should.eql( expanded ); 
                        callback();
                        
                    } catch ( e ) {
                        
                        callback( e );
                        
                    }
                    
                } ) );
         
            } catch ( e ) {
                
                callback( e );
            }
       
        }    


    } ) ).then( () => this.run( evtForUpdateWithMismatchedId, null, 
    
        this.verifyStatusCode( 422, [
 
            "Should reject a PUT where the id does not match the URL",
            "The test sent " + evtForUpdateWithMismatchedId.body,
        
        ] )
        
    ) );

};
