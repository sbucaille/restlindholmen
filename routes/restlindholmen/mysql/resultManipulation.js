/*
 * Developed by Steven BUCAILLE on 11/26/18 9:17 PM.
 * Last modified 11/26/18 9:17 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let dbschema = require('./mysqlconnection').dbschema;
let functions;
let paths = require('../RestAPI/paths');
let finalTable;

let getArrayFromResult = (results) => {
	let tabOfIds = [];
	results.forEach((result) => {
		tabOfIds.push(result[Object.keys(result)[0]])
	});
	return tabOfIds;
};

let getResultWithLinkedParameter = (result) => {
	let toReturn = {};
	result.forEach(r => {
		if(toReturn[r.parameter]){
			toReturn[r.parameter].push(r);
		}
		else{
			toReturn[r.parameter] = [];
			toReturn[r.parameter].push(r);
		}
		delete toReturn[r.parameter][toReturn[r.parameter].length - 1].parameter;
	});
	return toReturn;
};

async function getFormattedRowFromResult(row, key, tables, filter) {
    let filterKeys = Object.keys(filter);
    let formattedRow = {};
    let dbKeys = Object.keys(dbschema.tableContent[key]);
    for (let dbKey in dbKeys) {
        formattedRow[dbKeys[dbKey]] = row[`${key}.${dbKeys[dbKey]}`];
    }
    for (let filterKey in filterKeys) {
        // if (finalTable.includes(filterKeys[filterKey])) {
        //     let res = await functions[filterKeys[filterKey]][paths.secondaryPath[filterKeys[filterKey]].info]([row[`${filterKeys[filterKey]}.id`]]);
        //     console.log(res);
        //     formattedRow[filterKeys[filterKey]] = res;
        // } else {
            if (tables.includes(filterKeys[filterKey]))
                formattedRow[filterKeys[filterKey]] = getFormattedRowFromResult(row, filterKeys[filterKey], tables, filter[filterKeys[filterKey]]);
        // }
    }

    return formattedRow;
}

let getFormattedResultFromFilteredQuery = async (result, filter, tables, unions, requestFunctions) => {
    functions = requestFunctions;
    finalTable = unions.finalTable;
    let formattedResult = [];
    let filterKeys = Object.keys(filter);
    for (let i = 0; i < result.length; i++) {
        let row = result[i];
        let formattedRow = {};
        for (let j = 0; j < filterKeys.length; j++) {
            let filterValue = filter[filterKeys[j]];
            if (tables.includes(filterKeys[j])) {
                formattedRow[filterKeys[j]] = await getFormattedRowFromResult(row, filterKeys[j], tables, filterValue);
            }
        }
        formattedResult.push(formattedRow);
    }
    return formattedResult;
};

module.exports = {
	getArrayFromResult: getArrayFromResult,
	getResultWithLinkedParameter: getResultWithLinkedParameter,
    getFormattedResultFromFilteredQuery : getFormattedResultFromFilteredQuery
};