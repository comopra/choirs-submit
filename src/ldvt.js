const ldvalidate = require( "./ld-validate" );
const ldQuery = require( "ld-query" );
const fs = require( "fs" );
const jsonld = require( "jsonld" );

fs.readdir( __dirname + "/../schema", ( e, entries ) => {
    
    if ( e ) { throw e; }
    const requiredPattern = /^(.*)\.json$/;
    const isJSONfile = filename => requiredPattern.test( filename );
    const nameOf = filename => requiredPattern.exec( filename )[ 1 ];
    const jsonOf = filename => require( __dirname + "/../schema/" + filename );
    const objectOf = filename => ( { [ nameOf( filename ) ] : jsonOf( filename ) } );
    const addJSON = ( hash, filename ) => Object.assign( hash, objectOf( filename ) );
    const schemas = entries.filter( isJSONfile ).reduce( addJSON, {} );
    const context = { "@vocab": "http://schema.org/" };
    const query = ldQuery( context );
    const validate = ldvalidate( query, schemas, context );
    jsonld.expand( {
        "@context": context,
        "@type": "Organization",
        "name": "porky",
        "location": {
            
            "@type": "Place",
            "address": {
                
                "@type": "PostalAddress",
                "addressCountry": "United Kingdom",
                "addressRegion": "County Down",
                "addressLocality": "Donaghadee",
                "postalCode": "BT21 0AE"
                
            },
            "geo": {
                
                "@type": "GeoCoordinates",
                "latitude": 54.646155,
                "longitude": -5.541578
                
            }
            
        }
    }, ( e, expanded ) => validate( "choir", expanded, console.log.bind( console ) ) );

} );