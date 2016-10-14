
module.exports = function( testConfig ) {
    
   function S3() {
    
        this.calls = [];
        
    }
    S3.prototype.putObject = function putObject( params, callback ) {
        
        this.calls.push( { target: this.putObject, args: [ params ] } );
        callback();
        
    };
    S3.prototype.getObject = function getObject( params, callback ) {
    
        this.calls.push( { target: this.getObject, args: [ params ] } );
        if ( params.Bucket === "comopra.com-config" && params.Key === "comopra-choirs-submit" ) {
    
            callback( null, testConfig );   
            
        } else {
    
            callback( new Error( "Not found: " + JSON.stringify( params ) ), null );
            
        }
        
    };
    const mock = { S3 };
    global.AWS_SDK = mock;
    console.warn( "AWS_SDK mock installed" ); 
    
}