/*
 * Developed by Steven BUCAILLE on 12/30/18 8:46 PM.
 * Last modified 12/30/18 8:46 PM .
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
let getAllDependenciesID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.dependency.id)
            .from(dbTableNames.dependency)
    )
};

/**
 * EntityInfo typed query.
 * @param dependencyID
 * @returns {Promise<void>}
 */
let getDependencyInfo = async (dependencyID) => {
    return await knex
        .select()
        .from(dbTableNames.dependency)
        .whereIn(
            dbTableContent.dependency.id,
            dependencyID
        )
};

/**
 * ParameterLinked typed query.
 * @param diagramID
 * @returns {Promise<{}>}
 */
let getDependenciesFromDiagram = async (diagramID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.dependency.diagramID + ' as parameter',
                dbTableContent.dependency.id
            )
            .from(dbTableNames.dependency)
            .whereIn(
                dbTableContent.dependency.diagramID,
                diagramID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param classID
 * @returns {Promise<{}>}
 */
let getDependenciesFromSupplierClass = async (classID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.dependency.supplierClassID + ' as parameter',
                dbTableContent.dependency.id
            )
            .from(dbTableNames.dependency)
            .whereIn(
                dbTableContent.dependency.supplierClassID,
                classID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param classID
 * @returns {Promise<{}>}
 */
let getDependenciesFromClientClass = async (classID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.dependency.clientClassID + ' as parameter',
                dbTableContent.dependency.id
            )
            .from(dbTableNames.dependency)
            .whereIn(
                dbTableContent.dependency.clientClassID,
                classID
            )
    )
};

module.exports = {
    getAllDependenciesID : getAllDependenciesID,
    getDependencyInfo : getDependencyInfo,
    getDependenciesFromDiagram : getDependenciesFromDiagram,
    getDependenciesFromSupplierClass : getDependenciesFromSupplierClass,
    getDependenciesFromClientClass : getDependenciesFromClientClass
}