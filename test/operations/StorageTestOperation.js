const examples = __dirname + "/../examples";
const LambdaTestOperation = require( "operation-lambda/test-operations/LambdaTestOperation" );
function StorageTestOperation( systemUnderTest ) {
    
    LambdaTestOperation.call( this, systemUnderTest );

}
StorageTestOperation.prototype = Object.assign( new LambdaTestOperation(), {

    constructor:                    StorageTestOperation,
    shouldOnlyAccept:               require( "operation-lambda/test-operations/steps/should-only-accept" ),
    shouldOnlySupportContentTypes:  require( "operation-lambda/test-operations/steps/should-only-support-content-types" ),
    shouldParseBodyAsJSONLD:        require( "operation-lambda/test-operations/steps/should-parse-body-as-JSONLD" ),
    shouldHaveSchema:               require( "operation-lambda/test-operations/steps/should-have-schema" )( examples ),
    shouldBeStoredInS3:             require( "./steps/should-be-stored-in-S3" )( examples ),
    shouldIndicateResult:           require( "./steps/should-indicate-result" )( examples )
    
} );
module.exports = StorageTestOperation;
