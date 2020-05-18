import {userConstants} from '../__constants'
import {userService} from '../__services'

export  const singIn = (user,password)=>{
    let role = "";
    let webToken ;
    return dispatch => {
        userService.login(user,password).then((data)=>{
            console.log(data);
            
            
            if(data.registered === true){
                role = data.role;
                webToken = data.webToken;
                dispatch(success(data.user,data.role,data.webToken));
            }else{
                dispatch(failure());
            }

            //dispatch(failure())

        }).catch(error => {
            console.log("Failed trying to make login proocess");
            dispatch(errorProcess(error));
        });

    }

    //function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user , role , webToken } }
    function failure() { return { type: userConstants.LOGIN_FAILURE} }
    function errorProcess(error) { return { type: userConstants.LOGIN_FAILURE, error } }
} 