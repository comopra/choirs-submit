const decorate = require( "../decorate" );

function BaseOperation() { }

const asArray = x => [].concat( x || [] );
const maybeFuncAsPromise = x => typeof x === "function" ? new Promise( x ) : x;
const asPromise = x => ( x && x.constructor === Promise ) ? x : Promise.resolve( x );
const invokeToPromises = invoke => asArray( invoke() ).map( maybeFuncAsPromise ).map( asPromise );
const invokeToPromise = invoke => Promise.all( invokeToPromises( invoke ) );
BaseOperation.prototype.execute = function( script ) {

    this.promise = Promise.resolve();
    const callProxy = ( name, args, invoke ) => {
        
        console.log( this.constructor.name, "->", name, args );
        this.promise = this.promise.then( () => invokeToPromise( invoke ) );
        return interceptor;
        
    };
    const interceptor = decorate( this, callProxy );    
    script( interceptor );
    return this.promise;
    
};
module.exports = BaseOperation;
