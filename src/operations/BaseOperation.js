const decorate = require( "../decorate" );
const asArray = x => [].concat( x || [] );
const maybeFuncAsPromise = x => x instanceof Function ? new Promise( x ) : x;
const maybeNotPromiseAsPromise = x => x instanceof Promise ? x : Promise.resolve( x );
const invokeToPromises = invoke => asArray( invoke() )
    .map( maybeFuncAsPromise )
    .map( maybeNotPromiseAsPromise );
const invokeToPromise = invoke => Promise.all( invokeToPromises( invoke ) );

function BaseOperation() { }
BaseOperation.prototype.execute = function( script ) {

    this.promise = Promise.resolve();
    const callProxy = ( name, args, invoke ) => {
        
        this.promise = this.promise.then( () => invokeToPromise( invoke ) );
        return interceptor;
        
    };
    const interceptor = decorate( this, callProxy );    
    script( interceptor );
    return this.promise;
    
};
BaseOperation.notImplemented = ( x ) => { throw new Error( "Not implemented" + ( x ? " " + x : "" ) ); };
module.exports = BaseOperation;
