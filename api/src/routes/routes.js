const router = require('express').Router();


router.get("/",(req,res)=>{
    res.json({"message":"Hello from API"})
    //console.log(global.db);
});



module.exports = router;