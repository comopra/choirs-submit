const request = require( "request-promise" );
const opts = {
    
    url: "https://gmlfljra3d.execute-api.us-east-1.amazonaws.com/live/ChoirsSubmit",
    method: "POST",
    headers: { "Content-Type": "application/ld+json" },
    body: JSON.stringify( {
    	"@context": { "@vocab": "http://schema.org/" },
    	"name": "Yo momma",
    	"@id": "http://worldchoirs.comopra.com/choirs/yo-momma-1234",
    	"location": {
    		"address": {
    			"addressCountry": "England",
    			"addressRegion": "Surrey",
    			"addressLocality": "Surreyville"
    		}
    	}
    } ),
    resolveWithFullResponse: true
    
};
console.time( "*" );
request( opts )
    .then( () => console.log( "." ) || request( opts ) )
    .then( () => console.log( "." ) || request( opts ) )
    .then( () => console.log( "." ) || request( opts ) )
    .then( () => console.log( "." ) || request( opts ) )
    .then( () => console.log( "." ) || request( opts ) )
    .then( () => console.log( "." ) || request( opts ) )
    .then( () => console.log( "." ) || request( opts ) )
    .then( () => console.log( "." ) || request( opts ) )
    .then( () => console.log( "." ) || request( opts ) )
    .then( res => console.log( res ) || console.timeEnd( "*" ) );