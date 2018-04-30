import {ALL_CUSTOMERS,CUSTOMER_BYLINETYPE,CUSTOMER_BYLINE} from '../actions/financeActions';
const initialState={
    payload:0,
    linetypeselected:0,
    lineselected:0,
    fin_customers:[]
    /* name:"Raj",
    age:20 */
}

function financeReducer(state=initialState,action){
    switch(action.type){
        case ALL_CUSTOMERS: 
            state={
                ...state,
                payload:action.payload,
                fin_customers:action.fin_customers
            }
            break;
        case CUSTOMER_BYLINETYPE: 
            state={
                ...state,
                payload:action.payload,
                linetypeselected:action.linetypeselected,
                /* fin_customers:action.fin_customers */
            }
            break;
            case CUSTOMER_BYLINE: 
            state={
                ...state,                
                lineselected:action.lineselected,
                /* fin_customers:action.fin_customers */
            }
            break;
        
    }
    return state;
}

export default financeReducer;
  