const LambdaOperation = require( "operation-lambda/operations/LambdaOperation" );
const schemas = require( "../../schema" );

function StorageOperation( options, callback ) {
    
    LambdaOperation.call( this, options, callback );
    
}

StorageOperation.prototype = Object.assign( new LambdaOperation(), {
    
    constructor: StorageOperation,
    shouldOnlyAccept:               require( "operation-lambda/operations/steps/should-only-accept" ),
    shouldOnlySupportContentTypes:  require( "operation-lambda/operations/steps/should-only-support-content-types" ),
    shouldParseBodyAsJSONLD:        require( "operation-lambda/operations/steps/should-parse-body-as-JSONLD" ),
    shouldHaveSchema:               require( "operation-lambda/operations/steps/should-have-schema" )( schemas ),
    shouldBeStoredInS3:             require( "./steps/should-be-stored-in-S3" ),
    shouldIndicateResult:           require( "./steps/should-indicate-result" )
    
} );


module.exports = StorageOperation;
