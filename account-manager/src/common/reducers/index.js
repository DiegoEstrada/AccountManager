import loggedReducer from './/../../login/reducers/isLogedInReducer';
import {userReducer} from './/../../login/reducers/userReducer';
import {combineReducers} from 'redux';


export const reducers = combineReducers({
    isLogged : loggedReducer,
    userData : userReducer
});
