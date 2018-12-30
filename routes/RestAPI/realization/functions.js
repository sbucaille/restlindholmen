/*
 * Developed by Steven BUCAILLE on 12/30/18 10:16 PM.
 * Last modified 12/30/18 10:16 PM .
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
let getAllRealizationsID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.realization.id)
            .from(dbTableNames.realization)
    )
};

/**
 * EntityInfo typed query.
 * @param methodID
 * @returns {Promise<void>}
 */
let getRealizationInfo = async (realizationID) => {
    return await knex
        .select()
        .from(dbTableNames.realization)
        .whereIn(
            dbTableContent.realization.id,
            realizationID
        )
};

/**
 * ParameterLinked typed query.
 * @param diagramID
 * @returns {Promise<{}>}
 */
let getRealizationsIDFromDiagram = async (diagramID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.realization.classDiagramID + ' as parameter',
                dbTableContent.realization.id
            )
            .from(dbTableNames.realization)
            .whereIn(
                dbTableContent.realization.classDiagramID,
                diagramID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param classID
 * @returns {Promise<{}>}
 */
let getRealizationsFromSupplierClass = async (classID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.realization.supplierClassID + ' as parameter',
                dbTableContent.realization.id
            )
            .from(dbTableNames.realization)
            .whereIn(
                dbTableContent.realization.supplierClassID,
                classID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param classID
 * @returns {Promise<{}>}
 */
let getRealizationsFromClientClass = async (classID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.realization.clientClassID + ' as parameter',
                dbTableContent.realization.id
            )
            .from(dbTableNames.realization)
            .whereIn(
                dbTableContent.realization.clientClassID,
                classID
            )
    )
};

module.exports = {
    getAllRealizationsID : getAllRealizationsID,
    getRealizationInfo : getRealizationInfo,
    getRealizationsIDFromDiagram : getRealizationsIDFromDiagram,
    getRealizationsFromSupplierClass : getRealizationsFromSupplierClass,
    getRealizationsFromClientClass : getRealizationsFromClientClass
}