


module.exports.StoredProcedures = class StoredProcedures{
    constructor(db){
        this.db = db;
    }
    listAllUsers  = async ()=> {
       let a = await this.db.collection('user').find().toArray();
        console.log(a);
    }
}

