module.exports = op => op
    .shouldOnlyAccept( "application/ld+json" )
    .shouldHaveSchema( "choir" )
    .shouldBeStoredInS3();