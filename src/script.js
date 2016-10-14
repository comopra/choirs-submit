module.exports = op => op
    .shouldOnlyAccept( [ "POST", "PUT" ] )
    .shouldOnlySupportContentTypes( [ "application/ld+json" ] )
    .shouldParseBodyAsJSONLD()
    .shouldHaveSchema( "choir" )
    .shouldBeStoredInS3()
    .shouldIndicateResult()