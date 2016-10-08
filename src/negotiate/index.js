module.exports = mediaTypes =>
    event => {
        
        const acceptHeader = event.headers.Accept;
        if ( !acceptHeader ) { return mediaTypes[ 0 ]; }
        if ( acceptHeader === "*" ) { return mediaTypes[ 0 ]; }
        if ( acceptHeader === "*/*" ) { return mediaTypes[ 0 ]; }
        return mediaTypes.find( x => ~acceptHeader.indexOf( x ) );
        
    };
    