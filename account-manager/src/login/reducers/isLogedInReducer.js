import {userConstants} from '../__constants'


//let user = JSON.parse(localStorage.getItem('user'));
const initialJSONState = { isLogged: false , user : '', role : '', webToken : ''} 


const loggedReducer = (state = initialJSONState,action)=>{
    switch(action.type){
        case userConstants.LOGIN_REQUEST:
           return { isLogged: false }; 
        
        case userConstants.LOGIN_SUCCESS:
            return { isLogged : true , user : action.user, role : action.role, webToken : action.webToken}; 

        case userConstants.LOGIN_FAILURE:
            return { isLogged: false };

        case userConstants.LOGOUT:
          return  { isLogged: false }; 
          
        default:
            console.log("Action type not suppoted");
            return state; 
    }

}

export default loggedReducer;