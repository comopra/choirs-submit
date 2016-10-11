const decorate = require( "../decorate" );

// const asArray = x => [].concat( x || [] );
// const maybeFuncAsPromise = x => x instanceof Function ? new Promise( x ) : x;
// const maybeErrorAsPromise = x => x instanceof Error ? Promise.reject( x ) : x;
// const maybeNotPromiseAsPromise = x => x instanceof Promise ? x : Promise.resolve( x );
// const invokeToPromises = invoke => asArray( invoke() )
//     .map( maybeFuncAsPromise )
//     .map( maybeErrorAsPromise )
//     .map( maybeNotPromiseAsPromise );
// const invokeToPromise = invoke => Promise.all( invokeToPromises( invoke ) );

function BaseOperation() { }

/*
    The call proxy is a chance in wrap the act of adding a promise to call the named function with the specified arguments
    For example, you could log the functions being called, or you could chain an additional .then or .catch after each
    promised invokation.
*/
BaseOperation.prototype.callProxy = function( name, args, invoke )  {
    
    this.promise = this.promise.then( () => {

        var invoked = [].concat( invoke() || [] );
        return Promise.all( invoked );
    
    } );
    
};

/*
    Calling execute with a script will cause a proxied copy of this operation to be passed to the script.
    If you wish to mess with the invokation of each script step, you can override the `callProxy` function.
    Cause you know you want to.
*/
BaseOperation.prototype.execute = function( script ) {

    this.promise = this.promise || Promise.resolve();
    const interceptor = decorate( this, ( name, args, invoke ) => {
  
        this.callProxy( name, args, invoke );
        return interceptor;
        
    } );
    script( interceptor );
    return this.promise;
    
};

module.exports = BaseOperation;
