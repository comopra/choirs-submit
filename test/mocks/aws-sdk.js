
module.exports = function( testConfig ) {
    
   function S3() {
    
        this.calls = [];
        
    }
    S3.prototype.putObject = function putObject( params, callback ) {
        
        this.calls.push( { target: this.putObject, args: [ params ] } );
        callback( null, { VersionId: "1.0.0" } );
        
    };
    S3.prototype.getObject = function getObject( params, callback ) {
    
        this.calls.push( { target: this.getObject, args: [ params ] } );
        if ( params.Bucket === "comopra.com-config" && params.Key === "comopra-choirs-submit" ) {
    
            callback( null, { Body: JSON.stringify( testConfig ) } );   
            
        } else {
    
            callback( new Error( "Not found: " + JSON.stringify( params ) ), null );
            
        }
        
    };
    const mock = { S3 };
    global.AWS_SDK = mock;
    console.warn( "AWS_SDK mock installed" ); 
    
}