import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store,history} from './common/_helper';


//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';


//import {userConstants} from './__constants'



import Login from './login/Login';
import Home from './home/Home';


ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>


  <Router history={history}>
    <Switch>
        {/* <PrivateRoute exact path="/" component={HomePage} /> */}
        <Route path="/home" component={Home} />
        <Route path="/sing-in" component={Login} />
        <Redirect from="*" to="/" />
    </Switch>
  </Router>
  
  </Provider>
    ,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
