const dotenv = require('dotenv');

const envFound = dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if( !envFound ){
    console.error("File .env not found");
    throw new Error(" Not .env File");
}else{
    //OK

    module.exports = {
        port : parseInt(process.env.PORT) || 3000,
        hostname : process.env.HOSTNAME || 'localhost'
    }
}