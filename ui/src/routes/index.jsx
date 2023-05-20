import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';




import {history} from '../common/_helper';
import Login from '../login/Login';
import Home from '../home/Home';

import PrivateRoute from './PrivateRoute';



export function MapRoutes(props){
    return(
    <Router history={history}>
        <Switch>
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/sing-in" component={Login} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
    );
}
