export const CUSTOMER_BYLINETYPE="CUSTOMER_BYLINETYPE";
export const CUSTOMER_BYLINE="CUSTOMER_BYLINE";
export const ALL_CUSTOMERS="ALL_CUSTOMERS";

export function allCustomers(payload,fin_customers){
    return{
        type:ALL_CUSTOMERS,
        payload:payload,
        fin_customers:fin_customers       
    }
}

export function customerbyLineType(payload,linetypeselected/* ,fin_customers */){
    return{
        type:CUSTOMER_BYLINETYPE,
        payload:payload,
        linetypeselected:linetypeselected,
       /*  fin_customers:fin_customers */        
    }
}

export function customerbyLine(line/* ,fin_customers */){
    return{
        type:CUSTOMER_BYLINE,
        lineselected:line,
        /* fin_customers:fin_customers  */      
    }
}