
const loader = require('./loaders/index');

accountManager = loader.startApp();

accountManager.then((status)=>{
    console.log("Account Manager Started at "+Date() + " Status : "+status)
}, (error)=>{
    console.error("Something went wrong at starting the app");
    console.error(error);
});

