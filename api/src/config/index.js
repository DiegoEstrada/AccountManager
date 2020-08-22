const dotenv = require('dotenv');
const envFound = dotenv.config({path: __dirname + '/.env'});
//console.log(__dirname)

if( envFound.error ){
    console.error(envFound.error);
    throw new Error(" Not .env File");
}else{
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    module.exports = {
        port : parseInt(process.env.PORT) || 3000,
        hostname : process.env.HOSTNAME || 'localhost',
        db_protocol : process.env.DB_PROTOCOL,
        db_hostname : process.env.DB_HOSTNAME,
        db_port : process.env.DB_PORT,
        db_name : process.env.DB_NAME,
        db_user : process.env.DB_USER,
        db_pwd : process.env.DB_PWD,
        dir_log_info : process.env.LOG_INFO,
        dir_log_debug : process.env.LOG_DEBUG,
        dir_log_warn : process.env.LOG_WARN,
        dir_log_error : process.env.LOG_ERROR,
        dir_log : process.env.LOG,
        secret_key : process.env.JWT_SECRTET_KEY,
        token_duration : process.env.JWT_DURATION_TOKEN ,
        token_algorithm : process.env.JWT_ALGORITHM,
        salt_rounds : process.env.SALT_ROUNDS,
        wrapper_field : process.env.RESPONSE_WRAPPER_WORD
    }

}



