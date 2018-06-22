//import PROFILE_UPDATE from '../constants/constants';

const PROFILE_UPDATE="PROFILEUPDATE";

export function updateProfile(payload,data){
    return{
        type:PROFILE_UPDATE,
        payload:payload,
        username:data
    }
}