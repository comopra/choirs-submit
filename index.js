const render = require( "./src/render" );
const gateway = require( "./src/gateway" );
const mediaTypes = [ "application/json", "text/html" ];
const negotiate = require( "./src/negotiate" )( mediaTypes );

module.exports.handler = ( event, context, callback ) => {

    const script = op => op
        .shouldOnlyAccept( "application/ld+json" )
        .shouldHaveSchema( "choir" );
    // must be json-ld
    // must have properties X, Y, Z
    // and it must be stored

};
