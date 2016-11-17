import load from "./modules/loader";

load( [ {
    
    key: "react",
    version: "15.3.2",
    src: "https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.min.js"
        
}, {
    
    key: "react-dom",
    version: "15.3.2",
    src: "https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.min.js"
    
}, {
    
    key: "redux",
    version: "3.6.0",
    src: "https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js"
    
}, {
    
    key: "react-redux",
    version: "4.4.6",
    src: "https://cdnjs.cloudflare.com/ajax/libs/react-redux/4.4.6/react-redux.min.js"
    
} 
//, {
    
//     key: "redux-thunk",
//     version: "2.1.0",
//     src: "https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.1.0/redux-thunk.min.js"
    
// }
] ).then(  

    modules => { 
        
        require( [ "./bootstrap" ] );
        
    },
    e => { 
        
        console.log( "ERROR", e );
        
    } 
    
);
