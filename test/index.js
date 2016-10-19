const fakeConfig = { bucket: "the-bucket" };
require( "./mocks/aws-sdk" )( fakeConfig );

const test = require( "operation-lambda/test-operations/test" );

test( {
  
    script: require( "../src/script" ),
    TestOperation: require( "./operations/StorageTestOperation" ),
    systemUnderTest: require( ".." )

} );
