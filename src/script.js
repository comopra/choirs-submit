module.exports = op => op
    .shouldOnlyAccept( [ "POST" ] )
    .shouldOnlySupportContentTypes( [ "application/ld+json" ] )
    .shouldParseBodyAsJSONLD()
    .shouldHaveSchema( "choir" )
    .shouldBeStoredInS3()
    .shouldIndicateResult()