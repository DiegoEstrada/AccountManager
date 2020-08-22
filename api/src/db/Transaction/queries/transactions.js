
const { ObjectId } = require("mongodb");

//const LAST_N_TRANSACTIONS = 5;


async function listAllTransactions(agregationArrayFilters) {

    /*
        This is a general function that dispatch the transactions
        idTransaction finds the ObjectId sent as parameter
        last return only the LAST_N_TRANSACTIONS documents in the query

    */

    let transactionCollection = global.db.collection('transaction');

    /*  let fieldsAgregation = {};
     let limitAgregation = {};
     let orderAgregation = {};
     let qAgregation = {}; */

    let agregationArray = new Array();

    let transactionTypeCollectionJoin = {
        $lookup: {
            from: 'transactiontype',
            localField: 'transactiontype_id',
            foreignField: '_id',
            as: 'transactiontypeCollection'

        }
    };

    let coinCollectionJoin = {
        $lookup: {
            from: "coin",
            localField: "coin_id",
            foreignField: "_id",
            as: "coinCollection"
        }
    };




    //Adding aggreattion set up to search a certain document NECESARIES Agregations

    agregationArray.push(transactionTypeCollectionJoin, coinCollectionJoin);
    let mergedArray = [];

    if(agregationArrayFilters && typeof(agregationArrayFilters) != 'undefined' && agregationArrayFilters != null){
        
        mergedArray.push(...agregationArray, ...agregationArrayFilters);
        //agregationArray.push(...agregationArrayFilters);
    }else{
        //No filters selected in query params
        mergedArray.push(...agregationArray);
    }

    

    //adding additional filters to aggregation functions


    let data;

    try{
        
        console.log(JSON.stringify(mergedArray))
        data = await transactionCollection.aggregate(mergedArray).toArray();
    }catch(err){
        //Something went wrong querying DB
        global.logger.err("DB ERROR QUERY "+err);
    }

    return data;
}



module.exports = transactionDBFunctions = {
    listAllTransactions,


}

