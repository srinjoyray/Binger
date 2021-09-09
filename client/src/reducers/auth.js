import { AUTH,LOGOUT,ADD_FAV } from '../constants/actionTypes';

const authReducer = (state={authData : null},action)=>{
    // console.log(action);
    switch(action.type){
        case AUTH : 
            localStorage.setItem('profile',JSON.stringify({...action?.data}));
            return {...state,authData : action?.data}
        case LOGOUT : 
            localStorage.clear();
            return {...state,authData : null}
        case ADD_FAV : 
            // console.log(action?.payload); 
            return state;      
        default :
            return state;
    }
}
export default authReducer;