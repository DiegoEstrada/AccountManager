import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {reducers} from '../reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, 
    composeEnhancer(applyMiddleware(thunk)),
);

//export const store = createStore(reducers,/* preloadedState, */ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// /* preloadedState, */ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
