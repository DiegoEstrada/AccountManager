
const {startLoggers,startWebServer,connectDB} = require('./loaders/index');

let logger;



async function  startComponents() {
    logger = await startLoggers();

    let dbConnection = await connectDB();

    let webServer = await startWebServer();
   
    
    

    return new Promise((resolve)=>{
        if(logger && webServer && dbConnection){
            global.db = dbConnection;
            global.logger = logger;
            resolve("Successfully");
        }else{
            resolve("Failed");
        }
    });
    
}


startComponents().then((status)=>{
    logger.info("Account Manager started  with status "+status);

});





