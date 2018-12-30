/*
 * Developed by Steven BUCAILLE on 12/30/18 9:58 PM.
 * Last modified 12/30/18 9:58 PM .
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbSchema = require('../../../dbschema').db;
let dbTableNames = dbSchema.tableNames;
let dbTableContent = dbSchema.tableContent;
let resultManipulation = require('../../mysql/resultManipulation');

/**
 * Array typed query.
 * @returns {Promise<Array>}
 */
let getAllAssociationsID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.association.id)
            .from(dbTableNames.association)
    )
};

/**
 * EntityInfo typed query.
 * @param associationID
 * @returns {Promise<void>}
 */
let getAssociationInfo = async (associationID) => {
    return await knex
        .select()
        .from(dbTableNames.association)
        .whereIn(
            dbTableContent.association.id,
            associationID
        )
};

/**
 * ParameterLinked typed query.
 * @param diagramID
 * @returns {Promise<{}>}
 */
let getAssociationsFromDiagram = async (diagramID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.association.classDiagramID + ' as parameter',
                dbTableContent.association.id
            )
            .from(dbTableNames.association)
            .whereIn(
                dbTableContent.association.classDiagramID,
                diagramID
            )
    )
};

module.exports = {
    getAllAssociationsID: getAllAssociationsID,
    getAssociationInfo: getAssociationInfo,
    getAssociationsFromDiagram: getAssociationsFromDiagram
}