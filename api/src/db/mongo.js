const config = require('../config/index');
const mongodb = require('mongodb');

/*
    The correct way to obtain a client connection to use based in this class
    Is first require this file in other js file, then obtain a instance from the class with the field class
    Later delcare an instance from tha class and using getConnection method, dont use 

    In the instance declaratin remembeer use async awayt modifiers to wait forward promise was reosolved
*/

module.exports.class = class Mongo {

    constructor(){
        this.mongoDBDriver = mongodb.MongoClient;

        // Connection URL
        this.url = config.db_protocol+"://"+config.db_hostname+":"+config.db_port;

        // Database Name
         this.dbName = config.db_name;


        this.dbConn = null;
    }

    
     getConnection = ()=>{
        return new Promise( (resolve,reject)=>{
            //console.log(this.dbConn)
            if(!this.dbConn || typeof(this.dbConn) == 'undefined' || this.dbConn == null){
                console.log("New Connection")
                 this.mongoDBDriver.connect(this.url,{useUnifiedTopology: true, useNewUrlParser: true },(err,client)=>{

                    if(err){
                        //logger.error(err);
                        reject(err);
                        
                        
                    }else{
                        //In the version 3.0 from mongo drive you have to specifie the db in that way to 
                        //Obtain db object which you can make queries
                        let db = client.db(this.dbName)
                        this.dbConn = db;
                        //db.collection('user').find();
                        resolve(this.dbConn);
        
                    }
                    
                });

            }else{
                console.log("Return same connection")
                resolve(this.dbConn);
            }
        });

    }

    closeConnection = ()=>{

        return new Promise((resolve,reject)=>{
            if(this.dbConn || typeof(this.dbConn) == 'undefined' || this.dbConn == null){
                this.dbConn.close();
                this.dbConn = null;
                resolve(true);
            }else{
                this.resolve(false);
            }
        });
    
    }
    
    
}









