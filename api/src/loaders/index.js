
/*
    To start the project we'll follow the next steps
        1 Start loggers
        2 Start web server
        3 Connect to DB
*/

/*
    Additionaly in this section we'll connect the strategies for jwt authentication
    Loaded by other scripts
*/

let logger = require('./winston');
let webServer = require('../server/express');
let mongodb = require('../db/mongo');

let passportSettings = require('./passport');




module.exports.startLoggers = function startLoggers(){

    return new Promise((resolve,reject)=>{
        let loggerOk = logger.info("Logger started Successfully");
        if(loggerOk && typeof(loggerOk) != 'undefined' && loggerOk != null){
            resolve(loggerOk);
        }
        else{
            resolve(false);
        }
    });

}

module.exports.startWebServer = function startWebServer(){
    console.log("Staring Express");
    //console.log(webServer)
    return new Promise((resolve)=>{
        if(webServer && typeof(webServer) != 'undefined' && webServer != null ){
            logger.info(`Web server started successfully at  ${webServer.server.address().address}:${webServer.server.address().port}`)
            //Here starts the strategies intergation usin middleware with express
            //console.log(webServer.app)
            passportSettings().then(passportSetUp=>{
                //Here we link the configurations made in passport.js script with the middleware
                //console.log(passportSetUp)
                webServer.app.use(passportSetUp.initialize());
            }).catch(error =>{
                logger.error('Error by setting up Passport Strategies');
                logger.error(error);
                
            });
            resolve(webServer)
        }else{
            logger.error("Error starting web server")
        }
        
    });
}

module.exports.connectDB = function  connectDB(){

    console.log("Staring mongo")
    return new Promise ( async (resolve,reject)=> {

        let Mongo = mongodb.class;
        let mongo = new Mongo();
        let clientTestConnection = await mongo.getConnection().catch((reason)=>{
            logger.error(reason)
        });
        if(!clientTestConnection || typeof(clientTestConnection) == 'undefined' || clientTestConnection ==null){
            logger.error("Can not connect with database");
            resolve(false);
        }else{
            //Ok
            logger.info("Conection established with Data base ");
            resolve(clientTestConnection);
        }

        
        
    });
}



