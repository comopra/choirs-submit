const examples = __dirname + "/../examples";
const LambdaTestOperation = require( "./LambdaTestOperation" );
function StorageTestOperation( systemUnderTest ) {
    
    LambdaTestOperation.call( this, systemUnderTest );

}
StorageTestOperation.prototype = Object.assign( new LambdaTestOperation(), {

    constructor:                    StorageTestOperation,
    shouldOnlyAccept:               require( "./steps/should-only-accept" ),
    shouldOnlySupportContentTypes:  require( "./steps/should-only-support-content-types" ),
    shouldParseBodyAsJSONLD:        require( "./steps/should-parse-body-as-JSONLD" ),
    shouldHaveSchema:               require( "./steps/should-have-schema" )( examples ),
    shouldBeStoredInS3:             require( "./steps/should-be-stored-in-S3" )( examples ),
    shouldIndicateResult:           () => Promise.reject( "Not implemented" )
    
} );
module.exports = StorageTestOperation;
