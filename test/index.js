    
    // script to test
    const script = require( "../src/script" );
    
    // testing operation
    const StorageTestOperation = require( "../src/operations/StorageTestOperation" );
    
    // thing to test
    const systemUnderTest = require( ".." );
    
    // how to fail the test run
    const bail = up => (
        
        ur => codez => suck => { throw up; }
        
    )()()()()()()()()()()()()()();
    
    // outcomes
    const pass = () => { console.log( "PASS" ); clearTimeout( pending ); };
    const fail = e => process.nextTick( () => bail( e ) );
    const timeout = () => { throw new Error( "Timed out" ); }
    
    // fire it up
    new StorageTestOperation( systemUnderTest )
        .execute( script )
        .then( pass, fail );
    
    // start the timeout
    const pending = setTimeout( timeout, 5000 );
