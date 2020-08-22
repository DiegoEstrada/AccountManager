const { ObjectId } = require("mongodb");


async function listAllUsers() {
    
   /*
        Find all users in user collection and link the roleId field to role collection to merge both collections in a simple array
   */
    //let data = await global.db.collection('user').find().toArray();
    let userCollection = global.db.collection('user');
    let data = await userCollection.aggregate([{
        $lookup : {
            from : 'role',
            let : { roleId: "$role_id" }, //This id in the perent collection user, in this case
            pipeline : [
                { "$match": { "$expr": { "$eq": ["$_id", "$$roleId"] } } }, //Here goes the child key in the first argument
            ],
            as : "roleCollection",
        }
    },

    { $unwind: { path: "$roleCollection", preserveNullAndEmptyArrays: true } },

    {
        $project: {
            "role_id": 0,
            "roleCollection._id": 0
        }
    }

]).toArray();
     return data;
}

async function getUserByID(idValue){
    /*
        Find a document in the user collection by passing the objectID string as parameter
    */
    let userCollection = global.db.collection('user');
    let uniqueUser = userCollection.findOne({_id : ObjectId(idValue)});
    
    //uniqueUser its a promise

    return uniqueUser;

}

module.exports  =  dbFunctions = {
    listAllUsers,
    getUserByID
}

