import {createStore, combineReducers, applyMiddleware} from 'redux';
import financeReducer from './reducers/financeReducer';

const mylogger=(store)=>(next)=>(action)=>{
    console.log("Logged",action);
    next(action);
}
const store=createStore(
    combineReducers({
        finRed:financeReducer
    }),
    {},
    applyMiddleware(mylogger)
);

export default store;