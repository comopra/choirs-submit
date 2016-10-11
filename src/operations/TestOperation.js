const BaseOperation = require( "./BaseOperation" );

function TestOperation() { }

TestOperation.prototype = Object.assign( {}, new BaseOperation(), {

    constructor: TestOperation,
    
    execute: function( script ) {

        const base = BaseOperation.prototype.execute;
        this.outcomes = [];
        
        console.log( "Test run begins\n---" );
        this.promise = base.call( this, script ).then( () => {
          
            console.log( "Test run ended" );
            const failures = this.outcomes.filter( x => x.status === "FAIL" );
            failures.forEach( ( fail, i ) => {
                
                const status = fail.status, name = fail.name, args = fail.args, output = fail.output; // destructuriiiiiiiiiiii
                console.log( "%d %s %s %s", i + 1, status, name, [].join.call( args, ", " ) );
                console.log( ( output && output.toString ) ? output.toString() : output );
                console.log();
                
            } );
            if ( failures ) { return Promise.reject( failures.length + " tests failed" ); }

        } );
        return this.promise;
        
    },
    
    startTest: function( name, args ) {
        
        return () => {
            
            console.log( "/-- Test: %s\n", name );
            return Promise.resolve();
            
        };

    },
    
    completeTest: function( name, args, isPass ) {
        
        const status = isPass ? "PASS": "FAIL";
        return output => {
            
            console.log( "Returning promise to", status, "for", name );
            return new Promise( process.nextTick ).then( () => {
                
                this.outcomes.push( { name, args, status, output } );
                console.log( "\\-- %s: %s %s\n", status, name, isPass ? "" : output );
              
            } );
            
        };
        
    },
    
    callProxy: function( name, args, invoke ) {

        const base = BaseOperation.prototype.callProxy;
        const start = this.startTest( name, args );
        const fail = this.completeTest( name, args, false );
        const succeed = this.completeTest( name, args, true );
        
        // promise to label the test
        this.promise = this.promise.then( start );
        // promise to run the test
        base.call( this, name, args, invoke );
        // promise to record a pass or fail for the test
        this.promise = this.promise.then( succeed, fail );

    }
    
} );

module.exports = TestOperation;

