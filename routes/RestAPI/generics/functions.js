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
    }
    else return false;
}

function addUnionToRecord(startTable, endTable, subQuery) {
    if (subQuery.unions[startTable]) {
        if (subQuery.unions[startTable][endTable]) {
            subQuery.unions[startTable][endTable] = true;
            if(!subQuery.tables.includes(startTable)) subQuery.tables.push(startTable);
            if(!subQuery.tables.includes(endTable)) subQuery.tables.push(endTable);

        }
        else {
            subQuery.unions[startTable][endTable] = {};
            addUnionToRecord(startTable, endTable, subQuery);
        }
    }
    else {
        subQuery.unions[startTable] = {};
        addUnionToRecord(startTable, endTable, subQuery);
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
    }
    else {
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
    }
    else if (typeof value === "number") {
        subQuery.where(dbschema.tableNames[entityName] + '.' + dbschema.tableContent[entityName][key], '=', value);
    }
    else if (Array.isArray(value)) {
        subQuery.whereIn(dbschema.tableNames[entityName] + '.' + dbschema.tableContent[entityName][key], value);
    }
};

function applyObjectFilter(filter, entityName, key, setQuery) {

    let subQuery = knex
        .select(dbschema.tableNames[key] + '.' + dbschema.tableContent[key].id)
        .from(dbschema.tableNames[key]);
    subQuery.unions = {};
    subQuery.tables = [];

    let criterias = Object.keys(filter);
    let newEntityName = key;
    for (let i = 0; i < criterias.length; i++) {
        let newKey = criterias[i];
        if (!Array.isArray(filter[criterias[i]]) && typeof filter[criterias[i]] === "object") {
            applyObjectFilter(filter[newKey], newEntityName, newKey, subQuery)
        }
        else {
            applyConstraintFilter(filter[newKey], newEntityName, newKey, subQuery)
        }
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
        }
        else if (typeofCriteria === "string" || typeofCriteria === "number") {
            applyConstraintFilter(newFilter[key], entityName, key, finalQuery);
        }
    }
    addSelectClauseToQuery(finalQuery);
    return finalQuery;
};

let getFilteredID = async (parameter) => {
    let entityName = Object.keys(parameter.filter)[0];
    let query = getFilteredQuery(parameter.filter, entityName);
    let tables = query.tables;
    return resultManipulation.getFormattedResultFromFilteredQuery(await query, parameter.filter, tables);
};


module.exports = {
    getFilteredID: getFilteredID
}
