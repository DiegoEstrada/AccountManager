
const {startLoggers,startWebServer,connectDB} = require('./loaders/index');

let logger;




async function  startComponents() {
    logger = await startLoggers();
    global.logger = logger;
    let dbConnection = await connectDB();
    global.db = dbConnection;
    let webServer = await startWebServer();
   
    
    
    

    return new Promise((resolve)=>{
        if(logger && webServer && dbConnection){
            
            
            resolve("Successfully");
        }else{
            resolve("Failed");
        }
    });
    
}


startComponents().then((status)=>{
    logger.info("Account Manager started  with status "+status);

});





