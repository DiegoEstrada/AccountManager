const validParams = require('./AcceptedQueryParameters');
const {BSON} = require('mongodb');
const moment = require('moment')


/*
    {$match : {<query>}},
    { $sort : { age : -1 } },
    { $project : { age : 1, status : 1, name : 1 } },
    { $limit: 5 }
*/

let validators = {
    getQueryParameters: (req, res, next) => {
        console.log("Transformig parameters to valid DB agregations")

        let queryParm = req.query[validParams.query];
        let fieldsParam = req.query[validParams.fields];
        let limitParams = req.query[validParams.limit];
        let orderParams = req.query[validParams.orderBy];


        if (queryParm && typeof (queryParm) !== 'undefined' && queryParm !== null) {
            let queyAgregationJSONString = handleQuery(queryParm);
            req.query[validParams.query] = queyAgregationJSONString;
        }

        if (orderParams && typeof (orderParams) !== 'undefined' && orderParams !== null) {
            let orderAgregationJSONString = handleOrder(orderParams);
            req.query[validParams.orderBy] = orderAgregationJSONString;
        }

        if (fieldsParam && typeof (fieldsParam) !== 'undefined' && fieldsParam !== null) {
            let fieldsAgregationJSONString = handleFields(fieldsParam);
            req.query[validParams.fields] = fieldsAgregationJSONString;
        }


        if (limitParams && typeof (limitParams) !== 'undefined' && limitParams !== null) {
            let limitAgregationJSONString = handleLimit(limitParams);
            req.query[validParams.limit] = limitAgregationJSONString;
        }





        /* console.log(fieldsParam);
        console.log(limitParams);
        console.log(orderParams);
 */






        ///Simulating made some validations





        next();
    }
}


function handleFields(fieldsStringRaw) {
    const SEPARATOR_SYMBOL = ',';
    const PROJECTION_KEY_VALUE = '$project';

    if (fieldsStringRaw && fieldsStringRaw !== '' && typeof (fieldsStringRaw) === 'string') {

        let agregateJSON = {};
        agregateJSON[PROJECTION_KEY_VALUE] = {};

        let fieldList = fieldsStringRaw.split(SEPARATOR_SYMBOL);

        fieldList.forEach(element => {

            //Check if StringRaw isnt empty 
            if (element && element !== '' && typeof (element) === 'string') {
                agregateJSON[PROJECTION_KEY_VALUE][element] = 1;
            }


            //console.log(element);
        });

        //console.log(JSON.stringify(agregateJSON))
        return JSON.stringify(agregateJSON);

    } else {
        //Incorrect param value
        return null;
    }

}

function handleLimit(limitStringRaw) {

    const LIMIT_KEY_VALUE = '$limit';
    const DEFAULT_VALUE_LIMIT = 15;

    if (limitStringRaw && limitStringRaw !== '' && typeof (limitStringRaw) === 'string') {

        let agregateJSON = {};
        agregateJSON[LIMIT_KEY_VALUE] = {};

        let integerLimitValue = DEFAULT_VALUE_LIMIT;
        try {
            integerLimitValue = parseInt(limitStringRaw);
        } catch (error) {
            //Invalid number pased as parameter
            console.log("Invalid parameter");
        }
        if (isNaN(integerLimitValue)) {
            integerLimitValue = DEFAULT_VALUE_LIMIT;
        }
        agregateJSON[LIMIT_KEY_VALUE] = integerLimitValue;
        //console.log(JSON.stringify(agregateJSON))
        return JSON.stringify(agregateJSON);
    } else {
        //Incorrect param value
        return null;
    }



}

function handleOrder(orderStringRaw) {
    /*
       expected parameter to recieve
       nameField:asc | nameField:desc
   */

    const ORDER_KEY_VALUE = '$sort';
    const SEPARATOR_SYMBOL = ',';
    const ASCENDING_VALUE = 'asc';
    const DESCENDING_VALUE = 'desc';
    const ORDER_OPTION_SYMBOL = ":";



    if (orderStringRaw && orderStringRaw !== '' && typeof (orderStringRaw) === 'string') {

        let agregateJSON = {};
        agregateJSON[ORDER_KEY_VALUE] = {};
        let failedToConstraint = false;

        let fieldList = orderStringRaw.split(SEPARATOR_SYMBOL);

        for (let i = 0; i < fieldList.length; i++) {
            let fieldToSortElement = fieldList[i];

            //Check if StringRaw isnt empty 
            if (fieldToSortElement && fieldToSortElement !== '' && typeof (fieldToSortElement) === 'string') {
                //Verify that always get an ORDER_OPTION_SYMBOL in each element
                let fieldModeRelationship = fieldToSortElement.split(ORDER_OPTION_SYMBOL);

                //Check only key : value
                if (fieldModeRelationship.length === 2) {
                    //Ok
                    //finally ensure that mode is the corresponding const strings
                    if (fieldModeRelationship[1] === ASCENDING_VALUE || fieldModeRelationship[1] === DESCENDING_VALUE) {

                        let assignMongoValue = (fieldModeRelationship[1] === ASCENDING_VALUE) ? 1 : -1;

                        agregateJSON[ORDER_KEY_VALUE][fieldModeRelationship[0]] = assignMongoValue;
                    } else {
                        //Different value as order mode passed as parameter
                        failedToConstraint = true;
                        break;
                    }

                } else {
                    //A field contains ORDER_OPTION_SYMBOL or is pasde as mode value
                    failedToConstraint = true;
                    break;
                }
            }

        }
        if (!failedToConstraint) {
            //console.log(JSON.stringify(agregateJSON));
            return JSON.stringify(agregateJSON);
        } else {
            return null;
        }


    } else {
        //Incorrect param value
        return null;
    }





}

function handleQuery(queryStringRaw) {
    //In te future implementations is necesary consider other kind of symbols as ()
    //That could be added in this section in order to make more accurate queryies

    /*
        By the future implementations would be an asset develop NOT operator, it just consider one part [NOT condition]
        Where conditon is  implemented as [KEY OPERATOR VALUE] KEY are field names
        OPERATOR are a list containgin all regular expressions to identfy them and a auxiliar list to define each symbol
        VALUES are either strings or numbers converted in each type using a function getValue()

        Other importatn thing to make wold be allow a regular expression in the LIKE operator as a value, to make a more
        accurate query when the API is being used. In this moments when the LIKE operator are recognized, the value returned
        by the previuos fucntion getValue() are considerater as the regular expression within considerate any other rule
    */

    const ORDER_KEY_VALUE = '$match';
    //const SEPARATOR_REGEX = '/\s*OR\s* | \s*AND\s*/g';

    const AND_LOGIC_OPERATOR = "AND";
    const OR_LOGIC_OPERATOR = "OR";
    const SEPARATOR_REGEX = new RegExp('\s*OR\s* | \s*AND\s*', 'g');


    if (queryStringRaw && queryStringRaw !== '' && typeof (queryStringRaw) === 'string') {

        /*  The implementation from query fields flllowig the next steps
            First we have to separate between ORs and ANDs, to make a JSON seems like { $match: { $or: [ { score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } } ] } }
            Were  we have to generate only one $OR payload for each repited  field
            And every AND field will have their separate JSON
            Finally each LIKE 'val' parameter will be replaced with a properie as this { '$match': { 'transactiontypeCollection.name': { $regex: 'val'} } }
        */



        let agregateJSON = {};
        agregateJSON[ORDER_KEY_VALUE] = {};

        let logicOperationsList = queryStringRaw.match(SEPARATOR_REGEX);

        let fieldList = queryStringRaw.split(SEPARATOR_REGEX);

        let faildedTransaltion = false;
        let logicOperatorsFlag = true;

        let orConditions = new Array();
        let andConditions = new Array();

        //Getting each sentence in the string passed
        for (let i = 0; i < fieldList.length; i++) {
            fieldValueElement = fieldList[i];


            //Have we any LOGIG OPERATOR 

            if (logicOperationsList === null) {

                //JUST CALL ONE CONDITION

                logicOperatorsFlag = false;
                let simpleConditionJSON = processCondition(fieldValueElement);
                //Check if correct 
                if (simpleConditionJSON && simpleConditionJSON !== null) {
                    agregateJSON[ORDER_KEY_VALUE] = simpleConditionJSON;
                    //console.log(JSON.stringify(agregateJSON));
                    return JSON.stringify(agregateJSON);
                } else {
                    //Failed to  translatei
                    return null
                }


            } else {

                //Getting the previous LOGIC operator
                let cleanLogicOperator = logicOperationsList[i];

                //check if exist
                if (!cleanLogicOperator || typeof (cleanLogicOperator) !== 'undefined' || cleanLogicOperator !== null) {
                    //Get last index, make validations to not assign a negative value
                    if (i === 0) {
                        cleanLogicOperator = logicOperationsList[0];
                    } else {
                        //Previous index and make shure dont overflow
                        if ((i - 1) > logicOperationsList.length - 1) {
                            cleanLogicOperator = logicOperationsList[logicOperationsList.length - 1];
                        } else {
                            //Just previious index
                            cleanLogicOperator = logicOperationsList[i - 1];
                        }

                    }

                    //Clean value

                } else {
                    global.logger.error("ERROR ASSGIN PREVIUOS LOGIC OPERATOR");
                    return null;
                }

                cleanLogicOperator = cleanLogicOperator.trim();



                let jsonReturned = processCondition(fieldValueElement);

                if (jsonReturned === null) {
                    faildedTransaltion = true;
                } else {


                    switch (cleanLogicOperator) {
                        case AND_LOGIC_OPERATOR:
                            andConditions.push(jsonReturned)
                            //console.log("AND")
                            break;
                        case OR_LOGIC_OPERATOR:
                            orConditions.push(jsonReturned)
                            //console.log("OR")
                            break;
                        default:
                            global.logger.error('UNCONTROLATED MATCH IN  logicOperationsList');
                            return null;
                    }



                }

            }

            //console.log(fieldValueElement);
        }
        //Lets check that all conditions were assigned
        if (faildedTransaltion === false && logicOperatorsFlag === true) {

            //console.log("Ok")

            /*
                { $match: { $or: [ { score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } } ] } }
            */



            /* console.log(orConditions);
            console.log(andConditions); */


            if (orConditions.length > 0) {
                agregateJSON[ORDER_KEY_VALUE].$or = orConditions;
            }

            if (andConditions.length > 0) {
                agregateJSON[ORDER_KEY_VALUE].$and = andConditions;
            }



            //console.log(JSON.stringify(agregateJSON))
            return JSON.stringify(agregateJSON);


        } else {
            //Failed to transale
            global.logger.error("Failed to transale the string passed");
            return null;
        }


    } else {
        //Incorrect param value
        return null;
    }


}

function getValue(stringValue) {


    const STRING_FIELDS_INDICATORS = [`'`, `"`];
    const DATA_TYPE_DATE = "DATE";
    const DATA_TYPE_STRING = "STRING";
    const DATA_TYPE_NUMBER = "NUMBER";
    const WILCARDS_SYMBOLS = ['%'];
    let getValueConvertionFailed = false;



    //Check if a parameter is defined
    if (stringValue && typeof (stringValue) === 'string') {

        let cleanStringValue = stringValue.trim();


        //Iterating over each string id to determine if a string or other data type are passed and also are enclosed by taht ID
        for (let index = 0; index < STRING_FIELDS_INDICATORS.length; index++) {
            let stringIdentifier = STRING_FIELDS_INDICATORS[index];

            //first check if contains the ID
            if (stringValue.includes(stringIdentifier)) {
                //Check that are well enclosed


                if (cleanStringValue[0] === stringIdentifier && cleanStringValue[cleanStringValue.length - 1] === stringIdentifier) {
                    //Well encolsed, contnue
                    //Remove identifier
                    let value = cleanStringValue.substring(1, cleanStringValue.length - 1);
                    //console.log("return " + value)

                    //Check if value is a valid Date using moment js
                    let isADate = false;

                    isADate = moment(value, 'YYYY-MM-DD', true).isValid();
                    console.log("DATE "+isADate)

                    let type = (isADate === true) ? DATA_TYPE_DATE : DATA_TYPE_STRING;




                    return { type: type, value: value };
                } else {
                    //
                    console.log("Bad enclosed paramter " + cleanStringValue);
                    getValueConvertionFailed = true;
                    break;
                }

            } else {
                //other data type distict of string
                try {
                    let doubleValue = parseFloat(stringValue);

                    if (isNaN(doubleValue)) {
                        getValueConvertionFailed = true;

                    } else {
                        return { type: DATA_TYPE_NUMBER, value: doubleValue };
                    }



                } catch (error) {
                    console.log("Error parsing value");
                    getValueConvertionFailed = true;

                }
            }


        }

        //Check errors
        if (getValueConvertionFailed) {
            console.log("CONTROLED ERROR")
            return null;
        } else {
            //OK
        }
    } else
        return null;
}

function transalateOperators(fieldName, logicOperator, valueToAssign) {
    //check that logicOperator is defined an a string
    const NULL_VALUE = 'NULL';

    if (logicOperator && typeof (logicOperator) === 'string') {

        const EQUAL_SYMBOL = "=";
        const DISTINCT_SYMBOL = "!=";
        const GREATHER_THAN_SYMBOL = ">";
        const GREATHER_THAN_EQUALS_SYMBOL = ">=";
        const LESS_THAN_SYMBOL = "<";
        const LESS_THAN_EQUAL_SYMBOL = "<=";
        const WILCARD_SYMBOL = "LIKE";

        const KEY_GET_VALUE_FROM_FUNCTION = 'value';
        const KEY_GET_TYPE_FROM_FUNCTION = 'type';

        const DATA_TYPE_DATE = "DATE";
        const DATA_TYPE_STRING = "STRING";
        const DATA_TYPE_NUMBER = "NUMBER";

        const NOT_OPERATOR = 'NOT';

        let equivalentJSON = {};
        let controlledNullValue = true;

        //Cleaning withe spaces
        let keyFiled = fieldName.trim();

        //Check if NULL operator are a value to assign null instead of null string
        let value;

        if (valueToAssign.trim() === NULL_VALUE) {
            value = null;

        } else {

            valueJSON = getValue(valueToAssign);
            value = valueJSON[KEY_GET_VALUE_FROM_FUNCTION];

            console.log("TYPE "+valueJSON[KEY_GET_TYPE_FROM_FUNCTION])
            //Checking data type 
            if(valueJSON[KEY_GET_TYPE_FROM_FUNCTION] === DATA_TYPE_DATE){
                let objDate = new Date(valueJSON[KEY_GET_VALUE_FROM_FUNCTION]);
                console.log(objDate + "TYPE "+typeof(objDate));
                value = null;
                value = objDate;
                let strJSON = `{"$match":{"date":{$gt : new Date("2019-02-10")}}}`
                let bsonObj = new BSON()
                //let strJSON2 = {$gt : ISODate('2019-02-10')}
                console.log(strJSON)
            }

            if (value && value !== null && typeof (value) !== 'undefined') {
                controlledNullValue = true;
            } else {
                controlledNullValue = false;
            }

        }

        if (controlledNullValue === true) {
            console.log(value + "TYPE "+typeof(value))

            switch (logicOperator) {
                case EQUAL_SYMBOL:

                    equivalentJSON[keyFiled] = value;
                    break;

                case DISTINCT_SYMBOL:

                    equivalentJSON.$ne = [keyFiled, value];
                    /* $ne: [ "$qty", 250 ] */
                    /* { 'transactiontypeCollection.name': { $regex: /^ed/} } } */
                    break;

                case GREATHER_THAN_SYMBOL:

                    let jsonGT = {};
                    jsonGT.$gt = value;
                    equivalentJSON[keyFiled] = jsonGT;
                    break;

                case GREATHER_THAN_EQUALS_SYMBOL:

                    let jsonGTE = {};
                    jsonGTE.$gte = value;
                    equivalentJSON[keyFiled] = jsonGTE;
                    break;

                case LESS_THAN_SYMBOL:

                    let jsonLT = {};
                    jsonLT.$lt = value;
                    equivalentJSON[keyFiled] = jsonLT;
                    break;

                case LESS_THAN_EQUAL_SYMBOL:

                    let jsonLTE = {};
                    jsonLTE.$lte = value;
                    equivalentJSON[keyFiled] = jsonLTE;
                    break;

                    break;
                case WILCARD_SYMBOL:
                    let JSONRegex = {};
                    JSONRegex.$regex = value;
                    equivalentJSON[keyFiled] = JSONRegex;
                    /*  { 'transactiontypeCollection.name': { $regex: /^ed/} }  */
                    break;

                default:
                    global.logger.error("Different logic operator recieved " + logicOperator);
                    return null;
            }

            return equivalentJSON;


        } else {

            console.log("Invalid value passed as field of " + fieldName);
            return null;

        }


    } else {

        global.loger.error("BAD logic operator recieved");
        return null;

    }

}

function processCondition(condition) {


    //in  the future add logic to incorporate IN operator, which recieve an array an add or over each element
    const OPERATORS_REGEX_LIST = [new RegExp('[^!=<>/LIKE/]=[^!=<>/LIKE/]', 'g'), new RegExp('[^!=<>/LIKE/]!=[^!=<>/LIKE/]', 'g'),
    new RegExp('[^!=<>/LIKE/]>[^!=<>/LIKE/]', 'g'), new RegExp('[^!=<>/LIKE/]>=[^!=<>/LIKE/]', 'g'),
    new RegExp('[^!=<>/LIKE/]<[^!=<>/LIKE/]', 'g'), new RegExp('[^!=<>/LIKE/]<=[^!=<>/LIKE/]', 'g'),
    new RegExp('[^!=<>/LIKE/]LIKE[^!=<>/LIKE/]', 'g')
    ];
    const OPERATORS_LIST_VALUES = ['=', '!=', '>', '>=', '<', '<=', 'LIKE'];

    const NOT_OPERATOR = 'NOT';


    //Going throw all possible operators

    for (let j = 0; j < OPERATORS_REGEX_LIST.length; j++) {
        let currentOperator = OPERATORS_REGEX_LIST[j];
        keyValueOpeatorRelationship = condition.split(currentOperator);
        //Check if split contains Key value using the operator
        if (keyValueOpeatorRelationship.length === 2) {
            let fieldName = keyValueOpeatorRelationship[0];
            let value = keyValueOpeatorRelationship[1];
            //console.log(" KEY " + fieldName + " VALUE -> " + value + " OPERATOR " + OPERATORS_LIST_VALUES[j]);

            jsonReturned = transalateOperators(fieldName, OPERATORS_LIST_VALUES[j], value);

            //queryAggregations.push(jsonReturned);

            //console.log("OBTAINED RESULT " + JSON.stringify(jsonReturned));

            return jsonReturned;
            //break;

        } else {
            //continue looking for
        }





    }
    //At this point I cant find any match, so I have a bad string request
    //Not found sintax condition in parameter

    return null;
}


module.exports = validators;