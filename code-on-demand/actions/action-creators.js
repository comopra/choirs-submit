import _ from "./action-types";

export default {
    
    fieldChange: ( prop, value ) => ( { type: _.FIELD_CHANGE, prop, value } )
    
};
