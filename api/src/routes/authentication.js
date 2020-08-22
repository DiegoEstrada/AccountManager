const router = require('express').Router();
//const bcrypt = require('bcrypt');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');

const config = require('../config/index');



router.post("/sing-in", async (req,res,next)=>{

    let jsonResponse = {};

    //Then have to validate that parameters always be user and password in the response 
    //authResult = await doLogin(req.body.user,req.body.password)

    passport.authenticate("local", { session: false }, (error, user) => {
        console.log(" *callback auth* localStrategy");
        //If an error in the db query print in logger and console
        if (error || !user) {
            jsonResponse.registered = false;

            if(error){
                global.logger.error(error);
            }
            //Failure login
            res.json({"response":jsonResponse});
        }else {
            console.log("*** comienza generacion token*****");
            const payload = {
                sub: user._id,
                exp: Date.now() + parseInt(config.token_duration),
                username: user.username,
                email : user.email,
                role : user.role
            };

            /* NOTA: Si estuviesemos usando sesiones, al usar un callback personalizado, 
            es nuestra responsabilidad crear la sesión.
            Por lo que deberiamos llamar a req.logIn(user, (error)=>{}) aquí*/

            /*solo inficamos el payload ya que el header ya lo crea la lib jsonwebtoken internamente
            para el calculo de la firma y así obtener el token*/
            const token = jwt.sign(JSON.stringify(payload), config.secret_key, {algorithm: config.token_algorithm});

            jsonResponse.registered = true;
            jsonResponse.id = user._id;
            jsonResponse.username = user.username;
            jsonResponse.email = user.email;
            jsonResponse.role = user.role;
            jsonResponse.webToken = token;

            //Login OK, send to client
            res.json({response : jsonResponse})

        }

    })(req, res);

});




module.exports = router;