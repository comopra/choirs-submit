module.exports = op => op
    .shouldOnlyAccept( "POST" )
    .shouldOnlyAcceptContentTypes( "application/ld+json" )
    .shouldHaveSchema( "choir" )
    .shouldBeStoredInS3()
    .shouldIndicateResult()