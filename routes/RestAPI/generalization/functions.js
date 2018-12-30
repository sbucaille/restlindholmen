/*
 * Developed by Steven BUCAILLE on 12/30/18 10:24 PM.
 * Last modified 12/30/18 10:24 PM .
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
let getAllGeneralizationsID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.generalization.id)
            .from(dbTableNames.generalization)
    )
};

/**
 * EntityInfo typed query.
 * @param generalizationID
 * @returns {Promise<void>}
 */
let getGeneralizationInfo = async (generalizationID) => {
    return await knex
        .select()
        .from(dbTableNames.generalization)
        .whereIn(
            dbTableContent.generalization.id,
            generalizationID
        )
};

/**
 * ParameterLinked typed query.
 * @param diagramID
 * @returns {Promise<{}>}
 */
let getGeneralizationsFromDiagram = async (diagramID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.generalization.classDiagramID + ' as parameter',
                dbTableContent.generalization.id
            )
            .from(dbTableNames.generalization)
            .whereIn(
                dbTableContent.generalization.classDiagramID,
                diagramID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param classID
 * @returns {Promise<{}>}
 */
let getGeneralizationsFromChildClass = async (classID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.generalization.childClassID + ' as parameter',
                dbTableContent.generalization.id
            )
            .from(dbTableNames.generalization)
            .whereIn(
                dbTableContent.generalization.childClassID,
                classID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param classID
 * @returns {Promise<{}>}
 */
let getGeneralizationsFromParentClass = async (classID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.generalization.parentClassID + ' as parameter',
                dbTableContent.generalization.id
            )
            .from(dbTableNames.generalization)
            .whereIn(
                dbTableContent.generalization.parentClassID,
                classID
            )
    )
};

module.exports = {
    getAllGeneralizationsID : getAllGeneralizationsID,
    getGeneralizationInfo : getGeneralizationInfo,
    getGeneralizationsFromDiagram : getGeneralizationsFromDiagram,
    getGeneralizationsFromChildClass : getGeneralizationsFromChildClass,
    getGeneralizationsFromParentClass : getGeneralizationsFromParentClass
}