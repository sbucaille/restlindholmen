/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 7:27 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbschema = require('../../mysql/mysqlconnection').dbschema;
let checkFunctions = require('./check');
let resultManipulation = require('../../mysql/resultManipulation');
let paths = require('../paths');
let requestFunctions = {
    testGeneric: require('./functions'),
    diagram: require('../diagram/functions'),
    class: require('../class/functions'),
    attribute: require('../attribute/functions'),
    method: require('../method/functions'),
    methodParam: require('../methodParam/functions'),
    association: require('../association/functions'),
    associationEnd: require('../associationEnd/functions'),
    dependency: require('../dependency/functions'),
    realization: require('../realization/functions'),
    generalization: require('../generalization/functions'),
    umlfile: require('../umlfile/functions'),
    commit: require('../commit/functions'),
    repository: require('../repository/functions'),
    filecommit: require('../filecommit/functions'),
    people: require('../people/functions'),
    user: require('../user/functions')
};
let unions = {};


let addSelectClauseToQuery = (finalQuery) => {
    let tables = finalQuery.tables;
    for (let i = 0; i < tables.length; i++) {
        let keyServerSide = tables[i];
        let valueServerSide = dbschema.tableListContent[keyServerSide];
        for (let j = 0; j < valueServerSide.length; j++) {
            let keyDBSide = dbschema.tableNames[keyServerSide];
            let valueDBSide = dbschema.tableContent[keyServerSide][valueServerSide[j]];
            let column = {};
            column[`${keyServerSide}.${valueServerSide[j]}`] = `${keyDBSide}.${valueDBSide}`;
            finalQuery.column(column)
        }
    }
};

function checkIfUnionIsAlreadyInserted(unions, startTable, endTable) {
    if (unions[startTable]) {
        return !!unions[startTable][endTable];
    } else return false;
}

function addUnionToRecord(startTable, endTable, subQuery) {
    if (subQuery.unions[startTable]) {
        if (subQuery.unions[startTable][endTable]) {
            subQuery.unions[startTable][endTable] = true;
            if (!subQuery.tables.includes(startTable)) subQuery.tables.push(startTable);
            if (!subQuery.tables.includes(endTable)) subQuery.tables.push(endTable);

        } else {
            subQuery.unions[startTable][endTable] = {};
            addUnionToRecord(startTable, endTable, subQuery);
        }
    } else {
        subQuery.unions[startTable] = {};
        addUnionToRecord(startTable, endTable, subQuery);
    }
}

function addEntityAsFinalTable(endTable) {
    if (unions.finalTable) {
        if (!unions.finalTable.includes(endTable)) unions.finalTable.push(endTable);
    } else {
        unions.finalTable = [];
        addEntityAsFinalTable(endTable, unions);
    }
}

function insertUnionClause(startTable, endTable, subQuery) {
    let isDirect = dbschema.tableRelations[startTable][endTable].direct;
    if (isDirect) {
        let isUnionAlreadyInserted = checkIfUnionIsAlreadyInserted(subQuery.unions, startTable, endTable);
        if (!isUnionAlreadyInserted) {
            subQuery.innerJoin(
                dbschema.tableNames[endTable],
                dbschema.tableNames[startTable] + '.' + dbschema.tableContent[startTable][dbschema.tableRelations[startTable][endTable].key],
                dbschema.tableNames[endTable] + '.' + dbschema.tableContent[endTable][dbschema.tableRelations[endTable][startTable].key]
            );
            addUnionToRecord(startTable, endTable, subQuery);
        }
    } else {
        let pathTable = dbschema.tableRelations[startTable][endTable].path;
        let isUnionAlreadyInserted = checkIfUnionIsAlreadyInserted(subQuery.unions, startTable, pathTable);
        if (!isUnionAlreadyInserted) {
            subQuery.innerJoin(
                dbschema.tableNames[pathTable],
                dbschema.tableNames[startTable] + '.' + dbschema.tableContent[startTable][dbschema.tableRelations[startTable][pathTable].key],
                dbschema.tableNames[pathTable] + '.' + dbschema.tableContent[pathTable][dbschema.tableRelations[pathTable][startTable].key]
            );
            addUnionToRecord(startTable, pathTable, subQuery);
        }
        insertUnionClause(pathTable, endTable, subQuery);
    }
}

let applyConstraintFilter = (value, entityName, key, subQuery) => {
    if (typeof value === "string") {
        subQuery.where(dbschema.tableNames[entityName] + '.' + dbschema.tableContent[entityName][key], 'like', value);
    } else if (typeof value === "number") {
        subQuery.where(dbschema.tableNames[entityName] + '.' + dbschema.tableContent[entityName][key], '=', value);
    } else if (Array.isArray(value)) {
        subQuery.whereIn(dbschema.tableNames[entityName] + '.' + dbschema.tableContent[entityName][key], value);
    }
};

function applyObjectFilter(filter, entityName, key, setQuery) {
    let subQuery = knex
        .select(dbschema.tableNames[key] + '.' + dbschema.tableContent[key].id)
        .from(dbschema.tableNames[key]);
    subQuery.unions = {};
    subQuery.tables = [];
    let isNotFinalTable = false;

    let criterias = Object.keys(filter);
    let newEntityName = key;
    for (let i = 0; i < criterias.length; i++) {
        let newKey = criterias[i];
        if (!Array.isArray(filter[criterias[i]]) && typeof filter[criterias[i]] === "object") {
            applyObjectFilter(filter[newKey], newEntityName, newKey, subQuery);
            isNotFinalTable = true;
        } else {
            applyConstraintFilter(filter[newKey], newEntityName, newKey, subQuery)
        }
    }
    if (!isNotFinalTable) {
        addEntityAsFinalTable(newEntityName);
    }
    insertUnionClause(entityName, key, setQuery);
    setQuery.whereIn(
        dbschema.tableNames[key] + '.' + dbschema.tableContent[key].id,
        subQuery
    );
}

let getFilteredQuery = (filter, entityName) => {
    let newFilter = filter[entityName];
    let criterias = Object.keys(newFilter);
    let finalQuery = knex
        .select()
        .from(dbschema.tableNames[entityName]);
    finalQuery.unions = {};
    finalQuery.tables = [];
    for (let i = 0; i < criterias.length; i++) {
        let key = criterias[i];
        let typeofCriteria = typeof newFilter[key];
        if (typeofCriteria === "object") {
            applyObjectFilter(newFilter[key], entityName, key, finalQuery);
        } else if (typeofCriteria === "string" || typeofCriteria === "number") {
            applyConstraintFilter(newFilter[key], entityName, key, finalQuery);
        }
    }
    addSelectClauseToQuery(finalQuery);
    return finalQuery;
};

function formFinalResult(resultRow, filter, entityName, queryResult) {
    let rowResult = {};
    for (let i = 0; i < dbschema.tableListContent[entityName].length; i++) {
        let attribute = dbschema.tableListContent[entityName][i];
        rowResult[attribute] = resultRow[`${entityName}.${attribute}`];
    }
    queryResult.push(rowResult);

    let keys = Object.keys(filter);
    for (let i = 0; i < keys.length; i++) {
        if (typeof filter[keys[i]] === "object") {
            rowResult[dbschema.plurals[keys[i]]] = [];
            formFinalResult(resultRow, filter[keys[i]], keys[i], rowResult[dbschema.plurals[keys[i]]]);
        }
    }
}

function reassembleDuplicates(queryResult) {
    let keys = Object.keys(queryResult);
    for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(queryResult[keys[i]])) {
            let idList = {};
            let array = queryResult[keys[i]];
            for (let j = 0; j < array.length; j++) {
                let idOfEntity = array[j].id;
                if (idList.hasOwnProperty(idOfEntity)){
                    let indexOfAlreadySeenEntity = idList[idOfEntity];
                    let keysInEntity = Object.keys(array[j]);
                    for (let k = 0; k < keysInEntity.length; k++) {
                        if(Array.isArray(array[j][keysInEntity[k]])){
                            array[indexOfAlreadySeenEntity][keysInEntity[k]] = array[indexOfAlreadySeenEntity][keysInEntity[k]].concat(array[j][keysInEntity[k]]);
                        }
                    }
                    array.splice(j, 1);
                    j--;
                } else {
                    idList[idOfEntity] = j;
                }
            }
            for (let j = 0; j < array.length; j++) {
                reassembleDuplicates(array[j])
            }
        }

    }
}

let formattedPatternMatchingResult = async (result, filter) => {
    let queryResult = {};
    let firstEntity = Object.keys(filter)[0];
    queryResult[dbschema.plurals[firstEntity]] = [];
    for (let i = 0; i < result.length; i++) {
        formFinalResult(result[i], filter[firstEntity], firstEntity, queryResult[dbschema.plurals[firstEntity]]);
    }
    reassembleDuplicates(queryResult);
    return queryResult;
};

let getFilteredID = async (parameter) => {
    let entityName = Object.keys(parameter.filter)[0];
    unions.startTable = entityName;
    let query = getFilteredQuery(parameter.filter, entityName);
    // console.log(query.toString());
    let tables = query.tables;
    unions.unions = query.unions;
    let result = await query;
    return await formattedPatternMatchingResult(result, parameter.filter);
};

module.exports = {
    getFilteredID: getFilteredID
};
