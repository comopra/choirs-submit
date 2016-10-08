    
    // script to test
    const script = require( "../src/script" );
    
    // testing operation
    const testOperation = require( "../src/operations/test" );
    
    // thing to test
    const systemUnderTest = require( ".." );
    
    // outcomes
    const pass = () => { console.log( "PASS" ); clearTimeout( pending ); }
    const fail = e => { throw e; }
    const timeout = () => { throw new Error( "Timed out" ); }
    
    // fire it up
    testOperation.init( systemUnderTest ).execute( script ).then( pass, fail );
    
    // start the timeout
    const pending = setTimeout( timeout, 5000 );
