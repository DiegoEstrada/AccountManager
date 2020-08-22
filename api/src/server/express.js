const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const config = require('../config/index');
const routes = require('../routes/routes');
const authenticationRoute = require('../routes/authentication');
const transactionMapping = require('../routes/transactionMapping');

const app = express();
var server = require('http').createServer(app);




/* const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; */


//const dbFunctions = require('../db/storedProcedures');
//const { listAllUsers } = require('../db/storedProcedures');



server.listen(config.port,config.hostname);

//async function setUpPassportStategies() {

//    var  listAllUsers = dbFunctions.listAllUsers();
    

    /* passport.use(new LocalStrategy({
        //This field was an importatnt issue, cus both must be the same as are sent in the request 
        usernameField: "email",
        passwordField: "password",
        session: false
    },(username, password, done) => {
        console.log("LOCAL")
        //console.log("ejecutando *callback verify* de estategia local");
        return done(null,{username:"A"})
        /* return userRoleList.then(user => {

            console.log(user);
            return cb(null, user); //login ok

        }).catch(err => cb(err, null)); //Error in the query to find users */
        /* User.findOne({username:username})
        .then(data=>{
            if(data === null) return cb(null, false); //el usuario no existe
            else if(!bcrypt.compareSync(password, data.password)) { return cb(null, false); } //no coincide la password
            return cb(null, data); //login ok
        })
        .catch(err=>cb(err, null)) // error en DB */
    //}));
    

/* 
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret_key;
    opts.algorithms = [config.token_algorithm];
 */

    /* passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("ejecutando *callback verify* de estategia jwt");
 */
       /*  userRoleList.then(user => {
            if (user === null) { //no existe el usuario
                //podríamos registrar el usuario
                return done(null, false);
            } */
            /*
            encontramos el usuario así que procedemos a devolverlo para
            inyectarlo en req.user de la petición en curso
            */
            /* else
                return done(null, user);
        })
            .catch(err => done(err, null)) //si hay un error lo devolvemos */
/*
            return done(null, {username:"A"});
    })); */


/* 
    return new Promise((resolve,reject)=>{
        if(listAllUsers && typeof(listAllUsers)!='undefined' && listAllUsers != null){
            resolve(passport);
        }else{
            reject("Connection not ready")
        }
    }); */
    

//}










//Middlewares are defined as  an intermediate betwen request and responses 
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use("/api",routes); //Hello world
//app.use("/api/user",passport.authenticate('jwt', {session: false},userRoutes);
app.use("/api/authentication",authenticationRoute);
app.use("/api/transactions",transactionMapping); 





process.on('uncaughtException', function (err) {
    console.log( "UNCAUGHT EXCEPTION " );
    console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
    server.close();

});

//server.close();

module.exports.server = server;
module.exports.app = app;