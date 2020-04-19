const express = require("express");


const  SERVER_PORT = 3000;

var app = express();

app.set('port',process.env.SERVER_PORT || SERVER_PORT)

app.listen(app.get('port'),()=>{
    console.log("Server started in "+ app.get('port'));
});

