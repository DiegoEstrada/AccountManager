const router = require('express').Router();
const StoreProcedure = require('../db/storedProcedures');
//const bcrypt = require('bcrypt');

const USER_COLLECTION_KEY = 'alias';
const PASSWORD_COLLECTION_KEY = 'password';
const ROLE_COLLECTION_KEY = 'role';

router.post("/sing-in", async (req,res)=>{

    let authResult = false;


    //Then have to validate that parameters always be user and password in the response 
    authResult = await doLogin(req.body.user,req.body.password)

    //console.log(req);
    res.json({"response":authResult});
});


async function doLogin(user,password){

    //let registered = false;
    let jsonResponse = {};
    let storedProcedureInstance = new StoreProcedure();
    let list = await storedProcedureInstance.listAllUsers();
    list.forEach(userElemen => {
        if(userElemen[USER_COLLECTION_KEY] === user && userElemen[PASSWORD_COLLECTION_KEY] === password){
            //registered = true;
            jsonResponse.registered = true;
            jsonResponse.user = userElemen[USER_COLLECTION_KEY];
            jsonResponse.role = "role";
            jsonResponse.webToken = "WEB TOKEN ANYTHING";
        }else{
            jsonResponse.registered = false;
        }
    });

    return jsonResponse;
}


module.exports = router;