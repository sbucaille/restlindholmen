/*
 * Developed by Steven BUCAILLE on 12/30/18 10:07 PM.
 * Last modified 12/30/18 10:07 PM .
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
let getAllAssociationEndsID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.associationEnd.id)
            .from(dbTableNames.associationEnd)
    )
};

/**
 * EntityInfo typed query.
 * @param associationEndID
 * @returns {Promise<void>}
 */
let getAssociationEndInfo = async (associationEndID) => {
    return await knex
        .select()
        .from(dbTableNames.associationEnd)
        .whereIn(
            dbTableContent.associationEnd.id,
            associationEndID
        )
};

/**
 * ParameterLinked typed query.
 * @param diagramID
 * @returns {Promise<{}>}
 */
let getAssociationEndsFromDiagram = async (diagramID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.associationEnd.classDiagramID + ' as parameter',
                dbTableContent.associationEnd.id
            )
            .from(dbTableNames.associationEnd)
            .whereIn(
                dbTableContent.associationEnd.classDiagramID,
                diagramID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param associationID
 * @returns {Promise<{}>}
 */
let getAssociationEndsFromAssociation = async (associationID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.associationEnd.associationID + ' as parameter',
                dbTableContent.associationEnd.id
            )
            .from(dbTableNames.associationEnd)
            .whereIn(
                dbTableContent.associationEnd.associationID,
                associationID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param classID
 * @returns {Promise<{}>}
 */
let getAssociationEndsFromClass = async (classID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.associationEnd.classID + ' as parameter',
                dbTableContent.associationEnd.id
            )
            .from(dbTableNames.associationEnd)
            .whereIn(
                dbTableContent.associationEnd.classID,
                classID
            )
    )
};

module.exports = {
    getAllAssociationEndsID : getAllAssociationEndsID,
    getAssociationEndInfo : getAssociationEndInfo,
    getAssociationEndsFromDiagram : getAssociationEndsFromDiagram,
    getAssociationEndsFromClass : getAssociationEndsFromClass,
    getAssociationEndsFromAssociation : getAssociationEndsFromAssociation
}