( function() {
  
  var jsonld = require( "jsonld" );
  var stdin = process.openStdin();
  var data = "";
  stdin.on( "data", chunk => { data += chunk; } );
  stdin.on( "end", () => {

    data = JSON.parse( data );
    jsonld.toRDF( data, ( e, nquads ) => {
  
      console.log( e );
      console.log( JSON.stringify( nquads, null, 3 ) );
      console.log( nquads[ "@default" ].length )
      
      const fields = nquads[ "@default" ].map( q => {
      
      
        if ( q.object.type === "literal" ) {
                  
          return "<p>" +
            "<label for=\"" + q.subject.value + ":" + q.predicate.value + "\">" + q.predicate.value.split( "/" ).slice( -1 ) + "</label>\n" +
            "<input " +
              "id=\"" + q.subject.value + ":" + q.predicate.value + "\" " +
              "name=\"" + q.subject.value + " " + q.predicate.value + "\" " +
              "type=\"text\" " +
              "value=\"" + q.object.value + "\" " +
            "/>" + "\n" +
          "</p>"
          
        } else {
                  
          return "<input " +
            "name=\"" + q.subject.value + " " + q.predicate.value + "\" " +
            "type=\"hidden\" " +
            "value=\"" + q.object.value + "\" " +
          "/>"
          
        }
        
      } );
      console.log( fields.join( "\n" ) );
      
    } );

  } );
  
}() );