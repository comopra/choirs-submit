/* This allows injection of a mock */
if ( global.AWS_SDK ) { console.warn( "Using global.AWS_SDK" ); }
/* We use the AWS SDK to call S3 */
const aws = global.AWS_SDK || require( "aws-sdk" );
/* our "database" */
const db = new aws.S3();
/* sender */
const send = require( "operation-lambda/src/send" );

/* ports defined */
module.exports = { db, send };
