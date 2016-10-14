/* This allows injection of a mock */
if ( global.AWS_SDK ) { console.warn( "Using global.AWS_SDK" ); }
/* We use the AWS SDK to call S3 */
const aws = global.AWS_SDK || require( "aws-sdk" );
/* our "database" */
const db = new aws.S3();
/* ports defined */
module.exports = { db };
