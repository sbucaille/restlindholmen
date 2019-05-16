/*
 * Developed by Steven BUCAILLE on 1/3/19 5:22 PM.
 * Last modified 1/3/19 5:22 PM .
 * Copyright (c) 2019. All right reserved.
 *
 */


let knex = require('../../mysql/mysqlconnection').knex;
let dbSchema = require('../../../../dbschema').db;
let dbTableNames = dbSchema.tableNames;
let dbTableContent = dbSchema.tableContent;
let resultManipulation = require('../../mysql/resultManipulation');

/**
 * Array typed query.
 * @returns {Promise<Array>}
 */
let getAllUmlFilesID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.umlfile.id)
            .from(dbTableNames.umlfile)
    )
};

/**
 * EntityInfo typed query.
 * @param umlFileID
 * @returns {Promise<void>}
 */
let getUmlFileInfo = async (umlFileID) => {
    return await knex
        .select()
        .from(dbTableNames.umlfile)
        .whereIn(
            dbTableContent.umlfile.id,
            umlFileID
        )
};

/**
 * ParameterLinked typed query.
 * @param diagramID
 * @returns {Promise<{}>}
 */
let getUmlFileFromDiagram = async (diagramID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.umlfile.diagramID + ' as parameter',
                dbTableContent.umlfile.id
            )
            .from(dbTableNames.umlfile)
            .whereIn(
                dbTableContent.umlfile.diagramID,
                diagramID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param repositoryID
 * @returns {Promise<{}>}
 */
let getUmlFileFromRepository = async (repositoryID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.umlfile.repositoryID + ' as parameter',
                dbTableContent.umlfile.id
            )
            .from(dbTableNames.umlfile)
            .whereIn(
                dbTableContent.umlfile.repositoryID,
                repositoryID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param commitID
 * @returns {Promise<{}>}
 */
let getUmlFileFromCommit = async (commitID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.umlfile.commitID + ' as parameter',
                dbTableContent.umlfile.id
            )
            .from(dbTableNames.umlfile)
            .whereIn(
                dbTableContent.umlfile.commitID,
                commitID
            )
    )
};

module.exports = {
    getAllUmlFilesID : getAllUmlFilesID,
    getUmlFileInfo : getUmlFileInfo,
    getUmlFileFromDiagram : getUmlFileFromDiagram,
    getUmlFileFromRepository : getUmlFileFromRepository,
    getUmlFileFromCommit : getUmlFileFromCommit
};