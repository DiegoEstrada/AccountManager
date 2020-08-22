const router = require('express').Router();
//const bcrypt = require('bcrypt');
//const passport  = require('passport');
//const jwt       = require('jsonwebtoken');

//const config = require('../config/index');
//const transactionDBFunctions = require('../db/Transaction/queries/transactions');
const middleware = require('./ensureAuthentication');
const transactionController = require('../controllers/transactionsController');
const validateRequest = require('../server/handleGetQueryParameters');



router.get("/getTransactions",middleware.jwtAuthenticationStrategy ,validateRequest.getQueryParameters,transactionController.getTransactions);



/*
    middleware.jwtAuthenticationStrategy is a function middleware that ensures that the token are in the request and validate it

    validateRequest is a json function mapper that made valiations related to correct values and structre pased as parameter in the request

    transactionController join DB calls and dispatch the payload to the client
*/
module.exports = router;