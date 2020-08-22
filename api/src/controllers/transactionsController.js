const dbFunctions = require('../db/Transaction/queries/transactions');
const config = require('../config/index');
const validParams = require('../server/AcceptedQueryParameters');

let transactionController = {

    getTransactions: async (req, res) => {
        console.log("In controller ");
        let jsonResponse = {};

        let queryJSONString = req.query[validParams.query];
        let fieldsJSONString = req.query[validParams.fields];
        let limitJSONString = req.query[validParams.limit];
        let orderByJSONString = req.query[validParams.orderBy];

        let controlledInvalidQueryParameter = false;

        let aggregationObjects = new Array();

        try {
            //console.log(orderByJSONString)

            //q match

            if (typeof (queryJSONString) !== 'undefined') {
                //orderBy param result
                if (queryJSONString && queryJSONString !== '' && queryJSONString != null) {
                    let queryAggregation = JSON.parse(queryJSONString);
                    aggregationObjects.push(queryAggregation);
                } else {
                    controlledInvalidQueryParameter = true;
                }
            }

            if (typeof (orderByJSONString) !== 'undefined') {
                //orderBy param result
                if (orderByJSONString && orderByJSONString !== '' && orderByJSONString != null) {
                    let orderByAggregation = JSON.parse(orderByJSONString);
                    aggregationObjects.push(orderByAggregation);
                } else {
                    controlledInvalidQueryParameter = true;
                }
            }


            if (  typeof (fieldsJSONString) !== 'undefined' ) {
                //fields param result
                if (fieldsJSONString && fieldsJSONString !== '' && fieldsJSONString != null) {
                    let fieldsAggeregation = JSON.parse(fieldsJSONString);
                    aggregationObjects.push(fieldsAggeregation);
                } else {
                    controlledInvalidQueryParameter = true;
                }

            }

            if ( typeof (limitJSONString) !== 'undefined' ) {
                //limit param result
                if (limitJSONString && limitJSONString !== '' && limitJSONString != null) {
                    let limitAggregation = JSON.parse(limitJSONString);
                    aggregationObjects.push(limitAggregation);
                } else {
                    controlledInvalidQueryParameter = true;
                }
            }




            //console.log(aggregationObjects);


            //Dispatching the request

            if (!controlledInvalidQueryParameter) {
                //console.log("Waiting for BD")
                let transactionsList = await dbFunctions.listAllTransactions(aggregationObjects);
                
                //console.log(transactionsList)

                jsonResponse[config.wrapper_field] = transactionsList;
                //res.send(`Ok ${req.user.first_name} ${req.user.last_name}, bienvenido a la ruta protegida.`);

                res.json(jsonResponse);

            } else {
                res.status(400).send("Bad request in query parameters");
            }



        } catch (error) {
            res.status(400).send("Bad request transforming the query paramters");
            global.logger.error("ERROR TRYNG TO PARSE THE QUERY PARAMETERS " + error)

        }



    }

}

module.exports = transactionController;