if ( global.AWS_SDK ) { console.warn( "Using global.AWS_SDK" ); }
const aws = global.AWS_SDK || require( "aws-sdk" );
module.exports = {
    
    db: new aws.S3()
    
};
