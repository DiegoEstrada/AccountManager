
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {userConstants} from '../login/__constants/'
//import {useSelector} from 'react-redux';




const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  //var isLoggedSelector = useSelector(state => state.isLogged);
  let userSession = localStorage.getItem(userConstants.LOGGED_COOKIE_VALUE);
  //console.log(userSession)
  return (
  <Route
    {...rest}
    render={props => (
      (userSession /* && userSession == true */ )
        ? <Component {...props} />
        : <Redirect to="/sing-in" />
    )}
  />
  )
    };

export default PrivateRoute;