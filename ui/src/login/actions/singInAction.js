import {userConstants} from '../__constants'
import {userService} from '../__services'
import {history} from '../../common/_helper'
import {alertsFunctions} from '../../notifications'





export  const singIn = (user,password)=>{
    let role = "";
    let webToken ;
    return dispatch => {
        userService.login(user,password).then((data)=>{
            console.log(data);
            
            
            if(data.registered === true){
                role = data.role;
                console.log(data.username)
                webToken = data.webToken;
                dispatch(success(data.username,data.role,data.webToken));

                //Setting values for presist the session
                localStorage.setItem(userConstants.LOGGED_COOKIE_VALUE,true );
                localStorage.setItem(userConstants.USER_NAME_COOKIE_VALUE,data.username );
                localStorage.setItem(userConstants.TOKEN_COOKIE_VALUE,data.webToken );

                //cookies.set('myCat', 'Pacman', { path: '/' });
                history.push("/home");
            }else{
                //console.log("Hiiii")
                alertsFunctions.showAlertWarning("Usuario o contraseña invalida");
                
                dispatch(failure());
                
            }

            //dispatch(failure())

        }).catch(error => {
            console.log("Failed trying to make login proocess");
            console.error(error)
            dispatch(errorProcess(error));
        });

    }

    //function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user , role , webToken } }
    function failure() { return { type: userConstants.LOGIN_FAILURE} }
    function errorProcess(error) { return { type: userConstants.LOGIN_FAILURE, error } }
} 