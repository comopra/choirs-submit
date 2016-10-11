function buildProxy( target, prop, functionDecorator ) {
    
    return function proxy() { 
        
        const invoke = () => {

console.log( "Invoking", target.constructor.name, prop );
            const proxiedFunc = target[ prop ];    
            return proxiedFunc.apply( target, arguments );
            
        };
        return functionDecorator.call( 
            
            target, 
            prop, 
            arguments,
            invoke
        
        );

    }

}

function functionPropertiesOf( target ) {
    
    const props = [];
    for( var prop in target ) { 
        
        if ( typeof target[ prop ] === "function" ) {
            
            props.push( prop );
            
        }
        
    }
    return props;
    
}

module.exports = function decorate( target, functionDecorator ) {
    
    const interceptor = {};
    functionPropertiesOf( target ).forEach( prop => {
        
        interceptor[ prop ] = buildProxy( target, prop, functionDecorator );

    } );
    return interceptor;
    
};
