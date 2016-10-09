
const init = () => ( {
    
    promise: Promise.resolve(),
    execute: function( script ) { 
        
        script( this );
        return this.promise;
        
    },
    chain: function( func ) { 
        
        this.promise = this.promise.then( x => new Promise( func ) );
        return this;
        
    }
    
} );
module.exports = { init };