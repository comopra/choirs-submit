module.exports = function eor( fail, succeed ) {
    
    return function() {
        
        if ( arguments[ 0 ] ) { 
            
            fail( arguments[ 0 ] );
        
        } else {
        
            succeed.apply( null, [].slice.call( arguments, 1 ) );
            
        }   
        
    }
    
};
