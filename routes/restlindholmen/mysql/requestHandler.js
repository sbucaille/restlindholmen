/*
 * Developed by Steven BUCAILLE on 11/27/18 12:24 PM.
 * Last modified 11/27/18 12:24 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let resultManipulation = require('./resultManipulation');
let dbTableContent = require('../../../dbschema').db.tableContent;

let handleParameter = async (parameter, requestFunction) => {

    if (!Array.isArray(parameter)) parameter = [parameter];
    let requestResult = await requestFunction(parameter);
    return resultManipulation.getResultWithLinkedParameter(requestResult);
};

let getDataFromQuery = (request, parameter) => {
    if (request.body) {
        if(request.body[parameter]) return requestDataToArray(request.body, parameter);
        else throw parameter + " parameter could not be found.";
    }
    else if (request.query) {
        if(request.query[parameter]) return requestDataToArray(JSON.parse(request.query, parameter));
        else throw parameter + " parameter could not be found.";
    }
    else throw "No parameter found in body or query";
};

let requestDataToArray = (data, parameter) => {
    if (!data.filter){
        if (!Array.isArray(data[parameter])) return [data[parameter]];
        else return data[parameter];
    }
    else return data;
};

let applyFilter = (filter, tableName, query) => {
    if (typeof filter === "object") {
        let filterKey = Object.keys(filter);
        for (let i = 0; i < filterKey.length; i++) {
            if(Array.isArray(filter[filterKey[i]])) query.andWhere(dbTableContent[tableName][filterKey[i]], 'in', filter[filterKey[i]]);
            else query.andWhere(dbTableContent[tableName][filterKey[i]], 'like', filter[filterKey[i]]);
        }
    }
    else if(typeof filter[0] === "number") {
        query.whereIn(
            dbTableContent[tableName].id,
            filter
        );
    }
};

module.exports = {
    handleParameter: handleParameter,
    getDataFromQuery: getDataFromQuery,
    applyFilter : applyFilter
};