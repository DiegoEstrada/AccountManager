import {userConstants} from '../__constants';

let userSessionFlag = localStorage.getItem(userConstants.LOGGED_COOKIE_VALUE);
let userSessionName = localStorage.getItem(userConstants.USER_NAME_COOKIE_VALUE);
let userSessionToken = localStorage.getItem(userConstants.TOKEN_COOKIE_VALUE);
let userSessionRole = localStorage.getItem(userConstants.ROLE_COOKIE_VALUE);



//console.log(userSessionFlag) 
var initialJSONState = (userSessionFlag) ? {isLogged : true, user : userSessionName,  role : userSessionRole, webToken : userSessionToken} : 
                                           { isLogged: false , user : '', role : '', webToken : ''} 


const loggedReducer = (state = initialJSONState,action)=>{
    switch(action.type){
        case userConstants.LOGIN_REQUEST:
           return { isLogged: false }; 
        
        case userConstants.LOGIN_SUCCESS:
            //console.log("IN SUCCESS");
            return { isLogged : true , user : action.user, role : action.role, webToken : action.webToken}; 

        case userConstants.LOGIN_FAILURE:
            //console.log("IN FAIL")
            return { isLogged: false };
        

        case userConstants.LOGOUT:
          return  { isLogged: false }; 
          
        default:
            console.log("Action type not suppoted");
            return state; 
    }

}

export default loggedReducer;