const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;



const dbFunctions = require('../db/User/queries/user');
const config = require('../config/index');

const EMAIL_COLLECTION_KEY = 'email';
const PASSWORD_COLLECTION_KEY = 'password';
const ROLE_COLLECTION_KEY = "roleCollection";
const USER_COLLECTION_KEY = "firstName"

async function setUpPassportStategies() {

    var listAllUsers = dbFunctions.listAllUsers();


    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        session: false
    }, (email, password, done) => {
        console.log("LOCAL " + email)
        //console.log("ejecutando *callback verify* de estategia local");

        listAllUsers.then(users => {

            let registered = false;
            let jsonResponse = {};

            for (let i = 0; i < users.length; i++) {
                let userElemen = users[i];

                //IN THIS SECTION ITS NECESARY USE A HASH TO COMPARE PASSWORDS, BY THIS MOMENT THE TEXT IS COMPARED BUT ITS NOT SECURE
                //Comparing user has with DB hash using bcript functions
                let hashComparison = bcrypt.compareSync(password, userElemen[PASSWORD_COLLECTION_KEY]);
                //console.log(userElemen[PASSWORD_COLLECTION_KEY])

                if (userElemen[EMAIL_COLLECTION_KEY] === email && hashComparison === true) {
                    registered = true;
                    jsonResponse._id = userElemen["_id"];
                    jsonResponse.registered = true;
                    jsonResponse.email = userElemen[EMAIL_COLLECTION_KEY];
                    jsonResponse.role = userElemen[ROLE_COLLECTION_KEY];
                    jsonResponse.username = userElemen[USER_COLLECTION_KEY];
                    break;
                }/* else{
                    
                } */

            }

            if (!registered) {
                //Incorrect credentials
                return done(null, false);
            } else {
                //Login OK
                return done(null, jsonResponse)
            }


        }).catch(err => { console.log("ERR"); return done(err, null) }); //Database error

    }));


    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret_key;
    opts.algorithms = [config.token_algorithm];


    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("*callback verify* de JWT strategy");
        //console.log(jwt_payload);

        var uniqueUser = dbFunctions.getUserByID(jwt_payload.sub);

        //We check that ID user steel being recorded in DB
        //If true, we sent data, other wise sent a 401 error 

        uniqueUser.then(user => {

            //console.log(user);

            if (!user) {
                //ID sent not registered in DB
                return done(null, false);

            } else {
                //JWT OK
                //Just for send less info, we just send only teh ID, but we can send all payload
                return done(null, user._id);
            }

        }).catch(err => {
            global.logger.error(err);console.log(err);
            done(err, null);
        })


    }));



    return new Promise((resolve, reject) => {

        if (listAllUsers && typeof (listAllUsers) != 'undefined' && listAllUsers != null) {
            resolve(passport);
        } else {
            reject("Connection not ready")
        }

    });


}



module.exports = setUpPassportStategies; 