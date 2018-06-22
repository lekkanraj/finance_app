import {createStore, combineReducers, applyMiddleware} from 'redux';
import financeReducer from './reducers/financeReducer';
import profileReducer from './reducers/profileReducer';

const mylogger=(store)=>(next)=>(action)=>{
    console.log("Logged",action);
    next(action);
}
const store=createStore(
    combineReducers({
        finRed:financeReducer,
        proRed:profileReducer
    }),
    {},
    applyMiddleware(mylogger)
);

export default store;