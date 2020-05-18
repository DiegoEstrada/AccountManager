
import loggedReducer from './isLogedInReducer';
import {userReducer} from './userReducer';
import {combineReducers} from 'redux';


export const reducers = combineReducers({
    isLogged : loggedReducer,
    userData : userReducer
});
