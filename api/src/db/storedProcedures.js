


module.exports = class StoredProcedures{
    constructor(){
        console.log("constructor")
        this.db = global.db;
    }
    listAllUsers  = async ()=> {
       let a = await this.db.collection('user').find().toArray();
        return a;
    }
}

