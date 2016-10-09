    
    // script to test
    const script = require( "../src/script" );
    
    // testing operation
    const TestOperation = require( "../src/operations/TestOperation" );
    
    // thing to test
    const systemUnderTest = require( ".." );
    
    // outcomes
    const pass = () => { console.log( "PASS" ); clearTimeout( pending ); };
    const fail = e => process.nextTick( () => { throw e; } );
    const timeout = () => { throw new Error( "Timed out" ); }
    
    // fire it up
    new TestOperation( systemUnderTest )
        .execute( script )
        .then( pass, fail );
    
    // start the timeout
    const pending = setTimeout( timeout, 5000 );
