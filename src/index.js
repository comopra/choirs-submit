const http = require( "http" )
const { port, ip } = require( "./config" );
const helloWorld = ( req, res ) => {

  res.writeHead( 200, { "Content-Type": "text/plain" } );
  res.end( "Hello World\n" );
  
};
const server = http.createServer( helloWorld ).listen( port, ip );
console.log( `Server running at http://${ip}:${port}` );
