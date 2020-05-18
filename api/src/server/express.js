const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('../config/index');
const routes = require('../routes/routes');
const authenticationRoute = require('../routes/authentication');

const app = express();
var server = require('http').createServer(app);

//Middlewares are defined as  an intermediate betwen request and responses 
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use("/api",routes);
 app.use("/api/authentication",authenticationRoute) 

 server.listen(config.port,config.hostname);


process.on('uncaughtException', function (err) {
    console.log( "UNCAUGHT EXCEPTION " );
    console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
    server.close();

    });

server.close();

module.exports.server = server;
module.exports.app = app;