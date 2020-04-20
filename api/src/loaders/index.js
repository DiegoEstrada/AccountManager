const server = require('./express')

/*
    To start the project we'll follow the next steps
        1 Start web server 
        2 Connect to DB
        3 Alert if everithing its ok
*/

startApp = async  () => {
    let serverStatus = await startWebServer();
   
    let dbStatus = await connectDB();

   return processStatus(serverStatus,dbStatus);
}

function startWebServer(){
    console.log("Staring Express");

    return new Promise((resolve)=>{
        resolve(true);
    });
}

function connectDB(){
    console.log("Connecting with mongo");
    return new Promise ( (resolve)=> {
        resolve(true);
    });
}

function processStatus(webServerStatus, dbStatus){

    return new Promise((resolve,reject)=>{
        if(webServerStatus && dbStatus){
            resolve("Succesfully");
        }else{
            reject("With errors");
        }
    });
    
}

module.exports = {
    startApp : startApp
}

