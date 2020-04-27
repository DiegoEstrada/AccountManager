const express = require('express');
const morgan = require('morgan');

const config = require('../config/index');
const routes = require('../routes/routes');

const app = express();
var server = require('http').createServer(app);

//Middlewares are defined as  an intermediate betwen request and responses 
app.use(morgan('tiny'));
app.use("/",routes)

server.listen(config.port,config.hostname);


module.exports.server = server;
module.exports.app = app;