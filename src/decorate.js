module.exports = function decorate( target, functionDecorator ) {
    
    const props = [];
    for( var prop in target ) { props.push( prop ); }
    const interceptor = {};
    props.filter( p => typeof target[ p ] === "function" ).forEach( prop => {
        
        interceptor[ prop ] = function() {
            
            return functionDecorator.call(
                
                target,
                prop,
                arguments,
                () => target[ prop ].apply( target, arguments )
    
            );

        }
        
    } );
    return interceptor;
    
};
