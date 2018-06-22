//import PROFILE_UPDATE from '../constants/constants';

const PROFILE_UPDATE="PROFILEUPDATE";
const initialState={
    payload:0,
    username:sessionStorage.getItem('firstname')
}

function profileReducer(state=initialState,action){
    switch(action.type){
        case PROFILE_UPDATE: state={
            ...state,
            payload:action.payload,
            username:action.username
        }
        break;
    }
    return state;
}

export default profileReducer;