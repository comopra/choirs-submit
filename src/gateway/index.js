module.exports = ( media, callback ) => 
    ( e, body ) => 
        callback( e, {

            body,
            headers: { "Content-Type": media }
    
        } );
