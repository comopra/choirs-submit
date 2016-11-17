import load from "./modules/loader";

load( [ {
    
    key: "react",
    version: "15.3.2",
    src: "https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.min.js"
        
}, {
    
    key: "react-dom",
    version: "15.3.2",
    src: "https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.min.js"
    
} ] ).then(  

    modules => { 
        
        require( [ "./bootstrap" ] );
        
    },
    e => { 
        
        console.log( "ERROR", e );
        
    } 
    
);
