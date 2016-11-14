import { store, retrieve } from "./module-cache";

function download( module ) {
    
    return window.fetch( module.src )
        .then( res => res.text() )
        .then( text => { module.code = text; } );
        
}

function retrieveOrDownload( modules ) {
    
    const loading = modules.map( module => retrieve( module ) || download( module ) );
    return Promise.all( loading );

}

function evalCJS( resolveRequires, code ) {

    const module = { exports: {} };    
    const evaluateScript = new Function( "module", "exports", "require", code );
    evaluateScript( module, module.exports, resolveRequires );
    return module.exports;
    
}

function resolveRequires( modules, name ) {

    const module = modules.find( x => x.key === name );
    if ( !module ) { throw new Error( `Dependency not found: ${name}` ); }
    if ( !module.instance ) { throw new Error( `Dependency not loaded: ${name}` ); }
    return module.instance;

}

function evaluateModules( modules ) {
    
    const resolveWithModules = name => resolveRequires( modules, name );
    modules.forEach( module => {

        if ( !module.instance ) {

            console.log( "Evaluating", module.key );
            module.instance = evalCJS( resolveWithModules, module.code );
            
        }
        
    } );
    
}

function cacheModule( module ) {
    
    store( module );
    module.cached = true;
    
}

function cacheModules( modules ) {
    
    modules.filter( module => !module.cached ).forEach( cacheModule );
    
}

function loader( modules ) {

    const output = JSON.parse( JSON.stringify( modules ) );
    return retrieveOrDownload( output )
        .then( () => evaluateModules( output ) )
        .then( () => cacheModules( output ) )
        .then( () => Promise.resolve( output ) );
    
}

export default loader;
